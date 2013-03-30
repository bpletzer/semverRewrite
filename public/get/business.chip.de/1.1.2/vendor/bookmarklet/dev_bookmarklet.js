/**
 *
 * Use Bookmarklet : javascript:void(function(){var s=document.createElement('script');s.src = "http://www.chip.de/widgets/development/chip.dev.env.js?tstamp="+Math.round(Math.random()*10000000000); document.body.appendChild(s);})();
 */
define(["require"], function(req){
	return{
		init: function(){
			if(document.getElementById('fedoverlay')){
				document.body.removeChild(document.body.lastChild);
				return;
			}
			var doc = document,
				ITEMNAME = "cxodev",
				label,
			//Base-Config
				config = {
					use: null,
					settings: {}
				},
				storage = window.localStorage ? window.localStorage : doc.cookie,

				setCookie = function(name, config){
					document.cookie = name + "=" + JSON.stringify(config) + "; expires=Mi, 01-Jan-2020 20:00:00 GMT;path=/";
				},
				getTFValues = function(){
					var name = doc.getElementById("nameid").value;

					obj = {
						host: doc.getElementById("fedhost").value,
						port: doc.getElementById("fedport").value,
						offset: doc.getElementById("fedoffset").value,
						styleElmt: doc.getElementById('styleElmt').value,
						styleElmtValue: doc.getElementById('styleElmtValue').value
					};

					return ("{\"" + name + "\":" + JSON.stringify(obj) + "}");
				},
				fillWithValues = function(slct){
					var val = JSON.parse(slct.options[slct.selectedIndex].value);
					doc.getElementById("nameid").value = slct.options[slct.selectedIndex].text;
					doc.getElementById("fedhost").value = val.host || '';
					doc.getElementById("fedport").value = val.port || '';
					doc.getElementById("fedoffset").value = val.offset || '';
					doc.getElementById("use").checked = val.use;
					doc.getElementById('styleElmt').value = val.styleElmt;
					doc.getElementById('styleElmtValue').value = val.styleElmtValue;
				},
				createForm = function(){
					var overlay = doc.createElement("div"), formDiv,
						form = "<div class='fedbuttons'>Load Config(s)<br/><input type='text' id='loadFed' class='fedtf'/><button type='button' id='btnLoadFed'>Load Config-JSON</button>" +
							"<br/><a id='feda'>advanced</a><div id='fedtextload'><textarea cols='30' rows='10' id='fedtextarea'></textarea><button type='button' id='btnLaodTFFed'>Load from Textfield</button></div></div>" +
							"<div class='fedbuttons'>Choose Config<br/>" +
							"<button type='button' id='btnQCFed'>Quickchange</button><select id='slct'></select>" +
							"<button type='button' id='btnDelFed'>Delete</button></div>" +
							"<div class='fedbuttons'>Create new Config" +
							"<table class='fedtable' cellspacing='0' cellpadding='1'>" +
							"<tr><td>Name(ID)*:</td><td><input type='text' id='nameid' class='fedtf'/></td></tr>" +
							"<tr><td>Server*:Port:</td><td><input type='text' id='fedhost' class='fedtf' value='server.cxo.name'/></td>"+
							"<td>:<input type='text' id='fedport' class='fedtf' value='80'/></td></tr>" +
							"<tr><td>Offset:</td><td><input type='text' id='fedoffset' class='fedtf' value='/path/to/src/'/></td></tr>"+
							"<tr><td>Visibility:</td><td><input value='borderTop' type='text' id='styleElmt' class='fedtf'/><td><input value='5px solid red' type='text' id='styleElmtValue' class='fedtf'/></td></tr></table>" +
							"<div id='uselabel'>use this configuration: <input type='checkbox' id='use'/></div>" +
							"<button type='button' id='btnSaveFed'>Save</button><button type='button' id='btnCancelFed'>Cancel</button><button type='button' id='btnCloseFed'>Close & Reload Page</button></div>" +
							"<div id='fedlabel'></div>";
					overlay.setAttribute("id", "fedoverlay");
					doc.body.appendChild(overlay);
					formDiv = doc.createElement("div");
					formDiv.setAttribute("id", "fedform");
					formDiv.innerHTML = form;
					overlay.appendChild(formDiv);
				},
				updateSelectBox = function(){
					var slct = doc.getElementById("slct"),
						conf = getItem(ITEMNAME),
						fedconf, opt;
					label = doc.getElementById("fedlabel");
					slct.options.length = 0;
					if(conf){
						updateSettingsTF();
						for(fedconf in conf.settings){
							opt = doc.createElement("option");
							opt.text = fedconf;
							opt.style.color = (conf.use === fedconf) ? "green" : "black";
							conf.settings[fedconf].use = (conf.use === fedconf) ? true : false;
							opt.value = JSON.stringify(conf.settings[fedconf]);
							slct.options.add(opt);
						}
						slct.selectedIndex = -1;
						labelit(slct.options.length + " Setting(s) found. Active is : " + conf.use);
						return true;
					}else{
						labelit("No setting(s) found!", "warn");
						return false;
					}
				},
				updateSettingsTF = function(){
					doc.getElementById("fedtextarea").value = JSON.stringify(getItem(ITEMNAME).settings);
				},
				getCookie = function(name){
					var cookieArr = document.cookie.split(";"), i;
					for(i = 0; i < cookieArr.length; i++){
						x = cookieArr[i].substr(0, cookieArr[i].indexOf("="));
						y = cookieArr[i].substr(cookieArr[i].indexOf("=") + 1);
						x = x.replace(/^\s+|\s+$/g, "");
						if(x == name){
							return JSON.parse(unescape(y));
						}
					}
					return null;
				},
				getItem = function(name){
					if(storage === window.localStorage){
						return JSON.parse(storage.getItem(ITEMNAME));
					}else{
						return getCookie(name);
					}
				},
				setItem = function(name, value){

					if(storage === window.localStorage){
						storage.setItem(name, JSON.stringify(value));
					}else{
						setCookie(name, value);
					}
				},
				extend = function(t, f){
					var key;
					if(f){
						for(key in f){
							if(key){
								t[key] = f[key];
							}
						}
					}
				},
				labelit = function(msg, lvl){
					label.innerHTML = msg;
					if(lvl === "warn")label.style.color = "orange";
					if(lvl === "error") label.style.color = "red";
					if(lvl === undefined)label.style.color = "green";
				};
			defaultFedSettings = function(obj){
				var cook = getItem(ITEMNAME);
				if(!cook){
					setItem(ITEMNAME, config);
					cook = getItem(ITEMNAME);
				}
				extend(cook.settings, obj);
				setItem(ITEMNAME, cook);
				updateSelectBox();
			};

			//-------------Begin-------------
			if(storage){
				var slct, btnSave, btnClose, btnLoad, btnLoadTF, settingstf, btnDel, btnQC, btnCancel, aAdvanced, showTA;
				req(["./vendor/require-plugins/css!./dev_bookmarklet.css"]);

				//create Box and Update
				createForm();
				isConfig = updateSelectBox();

				slct = doc.getElementById("slct");
				btnSave = doc.getElementById("btnSaveFed");
				btnClose = doc.getElementById("btnCloseFed");
				btnLoad = doc.getElementById("btnLoadFed");
				btnDel = doc.getElementById("btnDelFed");
				btnQC = doc.getElementById("btnQCFed");
				btnCancel = doc.getElementById("btnCancelFed");
				aAdvanced = doc.getElementById("feda");
				btnLoadTF = doc.getElementById("btnLaodTFFed");
				settingstf = doc.getElementById('fedtextload');

				//add Button-Events
				slct.onchange = function(){
					fillWithValues(this);
				};
				btnQC.onclick = function(){
					var cook;
					if(slct.selectedIndex !== -1){
						cook = getItem(ITEMNAME);
						if(cook.use !== slct.options[slct.selectedIndex].innerHTML){
							cook.use = slct.options[slct.selectedIndex].innerHTML;
							setItem(ITEMNAME, cook);
							window.location.reload();
						}else{
							labelit(cook.use + " already used!", "warn");
						}
					}
				};
				btnDel.onclick = function(){
					var cook, name;
					if(slct.selectedIndex !== -1){
						name = slct.options[slct.selectedIndex].innerHTML;
						if(confirm('Delete ' + name + '?')){
							cook = getItem(ITEMNAME);
							if(cook.use === name){
								cook.use = null;
							}
							delete cook.settings[name];
							setItem(ITEMNAME, cook);
							updateSelectBox();
							labelit(name + " deleted!", "warn");
						}else{
							return;
						}

					}
				};
				btnSave.onclick = function(){
					var vals = getTFValues(), item;

					if(getItem(ITEMNAME)){
						item = getItem(ITEMNAME);
						if(doc.getElementById("use").checked){
							item.use = doc.getElementById("nameid").value;
						}else{
							if(item.use === doc.getElementById("nameid").value){
								item.use = null;
							}
						}
						extend(item.settings, JSON.parse(vals));
						setItem(ITEMNAME, item);
						updateSelectBox();
						labelit("Saved!");
					}else{
						if(doc.getElementById("use").checked){
							config.use = doc.getElementById("nameid").value;
						}
						extend(config.settings, JSON.parse(vals));
						setItem(ITEMNAME, config);
						updateSelectBox();
						labelit("Saved!");
					}

				};
				btnCancel.onclick = function(){
					var i;
					for(i = 0; i <= 3; i++){
						doc.body.removeChild(document.getElementById('fedoverlay'));
					}
				};
				btnClose.onclick = function(){
					window.location.reload();
				};
				btnLoad.onclick = function(){
					var url = doc.getElementById("loadFed").value,
						script;
					if(url){
						script = document.createElement('script');
						script.type = "text/javascript";
						script.src = url + "?callback=fedSettings";
						doc.body.appendChild(script);
					}
				};
				aAdvanced.onclick = function(){
					if(!showTA){
						settingstf.style.visibility = "visible";
						showTA = true;
					}else{
						settingstf.style.visibility = "hidden";
						showTA = false;
					}
				};
				btnLoadTF.onclick = function(){
					var set, item;
					try{
						set = JSON.parse(doc.getElementById('fedtextarea').value);
						item = getItem(ITEMNAME) ? getItem(ITEMNAME) : config;
						extend(item.settings, set);
						setItem(ITEMNAME, item);
						settingstf.style.visibility = "hidden";
						updateSelectBox();
						labelit("Settings added!");
					}catch(e){
						labelit("Can't add settings", "error");
					}
				};
			}else{
				alert("use a browser with local storage or enable cookies!");
			}
		}
	}
});