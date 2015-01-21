document.addEventListener("offline", onOffline, false);

function onOffline() {
    alert('No network connection');
}
$(document).ready(function(){
							    var cssSelector = {
                                    jPlayer: "#jquery_jplayer_1", 
                                    cssSelectorAncestor: "#jp_container_1"
                                };
								var options = {
                                    swfPath: "assets/js",
						            supplied: "mp3",
						            wmode: "window",
						            smoothPlayBar: false,
						            keyEnabled: false,
									loop: true
                                };
								
                                var playlist = []; // Empty playlist
                                var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);
                                $('.page__content').addClass("loading");
								$.ajax({
                                type: "GET",
                                url: "http://app.50djs50states.com/api.php?all",
                                dataType: "json",
                                cache: false,
		
                                success: function(data) {
								$('.page__content').removeClass("loading");
                                $.each(data.songs, function(i,value){
                                myPlaylist.add({
                                    title: "<p>"+value.category_name+"</p><p>"+value.mp3_title+"</p><p>"+value.mp3_year+"</p>",
                                    mp3: value.mp3_url,
									download: value.share_url,
                                    poster: 'http://app.50djs50states.com/images/'+value.category_image
                                    }); 
				                });
                            },
                                error: function(xhr, status, error) {
                                alert('No Connection');
                                }
                            });
							
						    });
jQuery(document).ready(function() {
// Audio Player
    var $players_on_page = $('.jp-audio').length;
    var $song_title = '';

    if($players_on_page > 0){
        for(var i = 1; i <= $players_on_page; i++){
            $('.jp-audio').eq(i-1).addClass('jp-audio'+i);
        };

        setTimeout(function () {
		        for(var i = 1; i <= $players_on_page; i++){
			    var $cover2 = $('#jp_poster_0').attr('src');
				var $cover = encodeURI($cover2);
                var $song_title = $('.jp-audio .jp-playlist ul li.jp-playlist-current .jp-playlist-current').html();
				var $twitter = $('.jp-audio .jp-playlist ul li.jp-playlist-current .ap-jp-song-url .free-dl').attr('href');
                $('.jp-audio .song_title').html($song_title);
				$('.page__content').css('background-image','url('+ $cover +')');
				$('.twitter_link').attr("onclick", "window.open('https://twitter.com/intent/follow?original_referer=&region=follow_link&screen_name="+$twitter+"&tw_p=followbutton', '_blank', 'location=yes');");
				}
				
				

        }, 3000);

        function switchSong() {
            setTimeout(function () {
                for(var i = 1; i <= $players_on_page; i++){
				    var $cover2 = $('#jp_poster_0').attr('src');
					var $cover = encodeURI($cover2);
					var $twitter = $('.jp-audio'+i+' .jp-playlist ul li.jp-playlist-current .ap-jp-song-url .free-dl').attr('href');
					$('.page__content').css('background-image','url('+ $cover +')');
					$('.twitter_link').attr("onclick", "window.open('https://twitter.com/intent/follow?original_referer=&region=follow_link&screen_name="+$twitter+"&tw_p=followbutton', '_blank', 'location=yes');");
					$('.jp-audio'+i+' .jp-previous, .jp-audio'+i+' .jp-next').removeClass('disabled');

                    if ($('.jp-audio'+i+' .jp-playlist ul li:last-child').hasClass('jp-playlist-current')) {
                        $('.jp-audio'+i+' .jp-next').addClass('disabled');
                    }
                    if ($('.jp-audio'+i+' .jp-playlist ul li:first-child').hasClass('jp-playlist-current')) {
                        $('.jp-audio'+i+' .jp-previous').addClass('disabled');
                    }
                    $song_title = $('.jp-audio'+i+' .jp-playlist ul li.jp-playlist-current .jp-playlist-item').html();
                    $('.jp-audio'+i+' .song_title').html($song_title);
					if ($('.jp-audio'+i+' .jp-next').hasClass('skip')) {
					    var allBanners = $('.banner');
                        var index = Math.floor(Math.random() * allBanners.length);
                        allBanners.eq(index).show();
						$('.jp-audio'+i+' .jp-next').removeClass('skip');
                    } else {
					$('.jp-audio'+i+' .jp-next').addClass('skip');
					}
					
                }
            }, 0)
        };

        $('.jp-previous, .jp-next, .jp-playlist ul').click(function() {
            switchSong()
        });
        $(".jp-jplayer").on($.jPlayer.event.ended, function(event) {
            switchSong()
        });
    };

    $(".jp-playlist-toggle").click(function () {
        var $this = $(this);
        for(var i = 1; i <= $players_on_page; i++){
            if ($this.parents('.jp-audio').hasClass('jp-audio'+i)) {
                $('.jp-audio'+i+' .jp-playlist').slideToggle("slow");
            }
        }
    });
	$('.hide').click(hide);
	function hide() {
	$('.banner').hide();
	
	}


});
