  enableLogger = function(elements, loggerURL, userid) {

    var si = 10000;
    var mmi = 500;
    var mesl = 10;

    var userid = userid; var loggerURL = loggerURL; var TS = (new Date).getTime();

    function guid(){
      var d = TS;
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
      });
      return uuid;
    };


    for (index = 0; index < elements.length; ++index) {
      element = elements[index];
      $(element).click( function(event) { stackevt(event, 1, $(this).attr('id')); }); 
      $(element).mousemove( function(event) { stackevt(event, 0, $(this).attr('id')); }); 
    }

    var uuid = guid();
    var mouseevt = function (w, e, obj, x, y) { this.w = w; this.e = e; this.o = obj; this.x = x; this.y = y; };
    var ajaxobj = function () { 
      this.ww = $(window).width(), this.wh = $(window).height(); this.dw = $(document).width(), this.dh = $(document).height();
      this.u = uuid; this.t = TS; this.i=userid; this.l = lot; this.d = eventstack; 
    };

    var saveevents = function() { if (eventstack.length > mesl) { $.post(loggerURL, {'o':JSON.stringify(new ajaxobj(), null, 2)}); le = ''; eventstack = []; lts = [0,0]; lot += 1; } };
    
    interval = window.setInterval( saveevents, si);
    $( window ).unload(function() { mesl = 0; saveevents(); } );

    var lot = 1; var le = ''; var eventstack = []; var lts = [0,0]; 

    stackevt = function(event, etype, e) {
      o = 1; ts = (new Date).getTime() - TS;
      if ((etype === 0) && (le === e)) { lt = lts[etype]; o = ((ts - lt) > mmi); }
      if (o) { lts[etype] = ts; le = e; eventstack.push(new mouseevt(ts, etype, e, event.pageX, event.pageY)); }
    }
  }
