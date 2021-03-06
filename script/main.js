$(document).ready(function () {
    initApp();
});

/* PAGE FUNCTIONALITY */
function initApp(){
    //Navigation button setup
    $(".navButton").click(function(e){
        if(!($(this).hasClass("selected"))){
            $("nav").find(".selected").removeClass("selected");
            $(this).addClass("selected");
            panToSelection($(this));
        }
    })

    //Quick Contact button setup
    $(".quickContact").not(".mail").click(function(e){
        window.open($(this).attr("data-href"), '_blank');
    });

    //Tippy Setup
    tippy(".quickContact", {
        placement: "bottom",
        livePlacement: false,
    });
    
    tippy(".skillItem", {
        dynamicTitle: true,
        placement: "bottom"
    });

    PageController = {
        CurrentPage: 0,
        Pages: [],
        getPageById: function(id){
            return this.Pages[id];
        },
        addPage: function(page){
            this.Pages.push(page);
        }
    };

    //Page Setup

    //HOME PAGE
    PageController.addPage(new Page($("#Home"), 0, function(){
        $(".quickContainer").animate({
            "opacity": 1
        }, 600);
    }, function(){
        $(".quickContainer").animate({
            "opacity": 0
        }, 600);
    }));

    //ABOUT PAGE
    PageController.addPage(new Page($("#About"), 1, function(){
        $(".aboutParagraph").animate({
            "opacity": 1
        }, 600);
    }, function(){
        $(".aboutParagraph").animate({
            "opacity": 0
        }, 600);
    }));

    //EXPERIENCES PAGE
    PageController.addPage(new Page($("#Experiences"), 2, function(){
        $(".experienceParagraph").animate({
            "opacity": 1
        }, 600);
    }, function(){
        $(".experienceParagraph").animate({
            "opacity": 0
        }, 600);
    }));

    //SKILLS PAGE
    PageController.addPage(new Page($("#Skills"), 3, function(){
        $("#Skills .container").animate({
            "opacity": 1
        }, 200);
    }, function(){
        $("#Skills .container").animate({
            "opacity": 0
        }, 200);
        $(".skillItem").removeClass("active");
        $(".reveal").removeClass("active");
    }));

    $("#Skills").find(".skillItem").click(function(e){
        if(!($(this).hasClass("active"))){
            $("#Skills").find(".skillItem").removeClass("active");
            $("#Skills").find(".reveal").removeClass("active");
            $(this).addClass("active");
            $(this).find(".reveal").addClass("active");
        }
        else{
            $(this).removeClass("active");
            $(this).find(".reveal").removeClass("active")
        }
    });

    //CONTACT PAGE
    PageController.addPage(new Page($("#Contact"), 4, function(){

    }, function(){

    }));

    PageController.getPageById(0).Init();
}

function panToSelection(relatedNavButton){
    PageController.getPageById(PageController.CurrentPage).DeInit();
    var offset = -100 * relatedNavButton.attr("data-offset") + "vw";
    $("main").animate({
        "left": offset
    }, 300, function(e){
        PageController.CurrentPage = relatedNavButton.attr("data-offset");
        PageController.getPageById(relatedNavButton.attr("data-offset")).Init();
    });
}

/* OBJECT CONSTRUCTORS */

function Page(ref, id, init, deinit){
    this.REF = ref;
    this.ID = id;
    this.Init = init;
    this.DeInit = deinit;
}

/* GLOBAL VARS */

var PageController;

/* GLOBAL FUNCTIONS */
