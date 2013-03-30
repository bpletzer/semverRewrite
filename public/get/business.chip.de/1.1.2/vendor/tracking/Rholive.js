define(['module', './TrackingSystem'], function(module, TrackSys) {

    var Rholive = TrackSys.inherit(TrackSys);

    Rholive.SYSTEM_ID = module.id;

    Rholive.img = document.createElement('img');


    Rholive.track_pi = function(val){
        val.tpl = this.render("http://{{url}}/images/pic.gif?m={{man}}&sep=%2C&tc={{tid}}&tce=1&tid={{tid}}&c={{cid}}&b={{bid}}&tp=&tn={{tn}}&tpn=&con=1&tit={{tit}}&url=" + escape(document.location) + "&json=1&random={{ran}}&r={{ref}}&sz={{r2sz}}&cs=1", val);
        this.img.src = val.tpl;
    };

    Rholive.init = function(val){
        this.treeNavIds = this.treeNavIds || val.treeNavIds;
        this.treeNavNames = this.treeNavNames || val.treeNavNames;
    };

    return Rholive;
});