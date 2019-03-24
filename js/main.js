// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '640',
    width: '900',
    videoId: '0N9McnK2kh0',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

var videoTime = 0;
var timeUpdater = null;
var showingBoard = false;
var justShowedBoard = false;
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // event.target.playVideo();不用管
  function updateTime() {
    var oldTime = videoTime;
    if(player && player.getCurrentTime) {
      videoTime = player.getCurrentTime();
    }
    if(videoTime !== oldTime) {
      onProgress(videoTime);
    }
  }
  timeUpdater = setInterval(updateTime, 100);
}

// when the time changes, this will be called.
function onProgress(currentTime) {
  console.log(currentTime);
  if(currentTime >= 129 && currentTime < 130 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerScenePizza();//这里要有括号
  }

  // 下面是我复制的
  if(currentTime >= 12 && currentTime < 13 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc1();//这里要有括号
  }

  if(currentTime >= 22 && currentTime < 23 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc2();//这里要有括号
  }

  if(currentTime >= 32 && currentTime < 33 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc3();//这里要有括号
  }

  if(currentTime >= 42 && currentTime < 43 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc4();//这里要有括号
  }

  if(currentTime >= 52 && currentTime < 53 && !showingBoard && !justShowedBoard) {
    console.log("Trigger");
    triggerSceneKc5();//这里要有括号
  }
  // 把上面的复制一堆
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    // setTimeout(triggerScenePizza, 6000);
    done = true;
  } else if (event.data == YT.PlayerState.ENDED) {
    setTimeout(triggerSceneExplain, 0); // 结尾
  }
}
function playVideo() {
  player.playVideo();
}
function pauseVideo() {
  player.pauseVideo();
}

function hideBoard() {
  $('.scene').hide();
  $('#board').hide();
  showingBoard = false;
  setTimeout(function () {
    justShowedBoard = false;
  }, 2000);
}
function showBoard() {
  $('.scene').hide();
  $('#board').show();
  showingBoard = true;
  justShowedBoard = true;
}

function startScene(scene) {
  $(scene).fadeIn(function () {
    pauseVideo(); // For sure
  });
}
function continueScene(el) {
  var next = $(el).data('next');
  console.log(next);
  $(el).parent('.scene').fadeOut(function () {
    $(next).fadeIn(function () {
      if (next.includes('scene-timer')) {//播放声音
        document.getElementById('sound').play();
        // !!!!!!!!!!important!
        setTimeout(continueScene, 4, $(next).find('.btn-continue'));
      } else if (next.includes('scene-end')) {
        document.getElementById('ending').play();
      }
    });
  });
}

function endScene(el) {
  $(el).parent('.scene').fadeOut(function () {
    hideBoard();
    playVideo();
  });
}

// 我加的
function triggerSceneExplain() {
  pauseVideo();
  showBoard();
  startScene('#scene-explain');
}

function triggerSceneListen() {
  showBoard();
  startScene('#scene-listen');
}
//
function triggerSceneVideo1() {
  showBoard();
  startScene('#scene-video1');
}
//

function triggerScenePizza() {
  pauseVideo();
  showBoard();
  startScene('#scene-title-pizza');
}
function triggerScenePractice() {
  showBoard();
  startScene('#scene-title-practice');
}
function triggerSceneEnd() {
  showBoard();
  startScene('#scene-end');
}

// 下面是各种KC的self-explanation环节
function triggerSceneKc1(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc1');
}
function triggerSceneKc2(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc2');
}
function triggerSceneKc3(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc3');
}
function triggerSceneKc4(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc4');
}
function triggerSceneKc5(){
  pauseVideo();
  showBoard();
  startScene('#scene-kc5');
}




// 后面都不用改了
$(document).ready(function () {
  showBoard();
  $('#scene-start').show();
  // hideBoard();

  $('.btn-start').click(function () {
    // hideBoard();
    // playVideo();
    // startScene('#scene-title');
  })
  $('.btn-continue').click(function () {
    if (!$(this).hasClass('btn-disabled')) {
      continueScene(this);
    }
  })
  $('.btn-end').click(function () {
    endScene(this);
  })
  $('.btn-share').click(function () {
    var url = "https://polarischen.github.io/tol-microwave/";
    var text = "Do you know how microwave ovens work? Check this out! 😉";
    var twitterWindow = window.open('https://twitter.com/share?url=' + url + '&text=' + text, 'twitter-popup', 'height=350, width=600');
    if (twitterWindow.focus) {
      twitterWindow.focus();
    }
  })
  $('.option').click(function () {
    $(this).parent('.gallery').find('.option').removeClass('option-selected');
    $(this).addClass('option-selected');
  })
  $('.select .option').click(function () {
    var $btn = $(this).parent('.select').parent('.scene').find('.btn-continue');
    $btn.removeClass('btn-disabled');

    var next = $(this).data('next');
    var target = $(this).parent('.select').data('target');
    var $btnTarget = $(target).find('.btn-continue');
    $btnTarget.data('next', next);
  })
  $('.input-answer').on('change keyup paste', function() {
    var $btn = $(this).parent('.scene').find('.btn-continue');
    if ($(this).val().length === 0) {
      $btn.addClass('btn-disabled');
    } else {
      $btn.removeClass('btn-disabled');
    }
  })

  // 下面是对local storage的尝试
  // var selfExplanation = document.getElementById('#input-answer-kc1');
  var selfExplanation = '';
  $('#btn-continue-kc1').click(function(){
    selfExplanationKc1 = $('#input-answer-kc1').val();
    // console.log(selfExplanation);
    localStorage.setItem('selfExplanationKc1',JSON.stringify(selfExplanationKc1));
    // console.log(localStorage.getItem('selfExplanation'));
    var hintKc1 = JSON.parse(localStorage.getItem('selfExplanationKc1'));
    // console.log("HINT="+hintKc1);
    // document.getElementById('self-explanation-kc1').innerHTML = hintKc1;
    $('#self-explanation-kc1').text(hintKc1);
  })

  $('#btn-continue-kc2').click(function(){
    selfExplanationKc2 = $('#input-answer-kc2').val();
    localStorage.setItem('selfExplanationKc2',JSON.stringify(selfExplanationKc2));
    var hintKc2 = JSON.parse(localStorage.getItem('selfExplanationKc2'));
    $('#self-explanation-kc2').text(hintKc2);
  })

  $('#btn-continue-kc3').click(function(){
    selfExplanationKc3 = $('#input-answer-kc3').val();
    localStorage.setItem('selfExplanationKc3',JSON.stringify(selfExplanationKc3));
    var hintKc3 = JSON.parse(localStorage.getItem('selfExplanationKc3'));
    $('#self-explanation-kc3').text(hintKc3);
  })

  $('#btn-continue-kc4').click(function(){
    selfExplanationKc4 = $('#input-answer-kc4').val();
    localStorage.setItem('selfExplanationKc4',JSON.stringify(selfExplanationKc4));
    var hintKc4 = JSON.parse(localStorage.getItem('selfExplanationKc4'));
    $('#self-explanation-kc4').text(hintKc4);
  })

  $('#btn-continue-kc5').click(function(){
    selfExplanationKc5 = $('#input-answer-kc5').val();
    localStorage.setItem('selfExplanationKc5',JSON.stringify(selfExplanationKc5));
    var hintKc5 = JSON.parse(localStorage.getItem('selfExplanationKc5'));
    $('#self-explanation-kc5').text(hintKc5);
  })

})