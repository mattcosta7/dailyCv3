$(document).ready(function(){
  //flash messages fade out on load
  if($('#flash').text() != ''){
    $('#flash').slideDown(500);
    $('#flash').on('click',function(){
      $(this).slideUp(500);
    })
    if($('#flash').is(':visible')){
      setTimeout(function(){
        $('#flash').slideUp(500)
        },3000);
    }
  }

  $('#category_selector_category_id').on('change',function(){
    if($('#category_selector_category_id').val()!=""){
      window.location = '/category/'+ $('#category_selector_category_id').val();
    }
  })
  //hide signup initially
  $('#signin-swap-2').hide();

  //show service status in modal on click, hide on close icon press
  $('.service-status').on('click',function(){
    $('#modal-content').html($(this).parent().parent().find('.train-delay-status').html())
    $('#modal').show();
    $('#close-icon').on('click',function(){
      $('#modal').hide();
    })
    $('#close-icon-left').on('click',function(){
      $('#modal').hide();
    })
  })

  //hide modals
  $('#modal').hide();
  $('#loading-modal').hide();
  $('#loader').hide();

  //on click of line item, if not the star show the item, and hide on close icon clicks
  $('main').on('click','li',function(e){
    if($(e.target).is('i')){
      return;
    }
    $('#modal-content').html($(this).find('.blog-entry-content').html())
    $('#modal').show();
    $('.mdl-list').hide();

    $('#close-icon').on('click',function(){
      $('#modal').hide();
      $('.mdl-list').show();
      
    })
    $('#close-icon-left').on('click',function(){
      $('#modal').hide();
      $('.mdl-list').show();
    })
  })

  //on sign in, show modal loader, because it's slow
  $('.sign-in-button').on('click',function(){
    setTimeout(function(){
      $('#loader').show();
      $('#loading-modal').show();
    },500);
  })

  //on new feed add button, show loader because it's slow
  $('#new-feed-button').on('click',function(){
    $('#delete-form').hide();
    $('#loader').show();
    $('#loading-modal').show();
  })

  //swap signin/signout 
  $('.swap-signin').on('click',function(){
    $('#signin-swap-2').toggle();
    $('#signin-swap-1').toggle();
  });

  $('#delete-button').on('click',function(){
    $('#loader').show();
    $('svg').hide();
    $('#loading-modal').show();
    $('#loading-modal').on('click',function(e){
      if($(e.target).is('#loader,#page,#phrase_box,.mdl-textfield,.mdl-textfield__input')){
        return;
      }
      else{
        $('#loader').hide();
        $('svg').show();
        $('#loading-modal').hide();
      }
    })
  })

  //on ajax successes, exchange full for empty star, and make db calls
  $('.main-content').on('ajax:success', '.un-star-button-link',function(){
    $(this).replaceWith("<a data-idNum='"+$(this).attr('data-idNum')+"'class='star-button-link' data-remote='true' rel='nofollow' data-method='post' href='/star/"+$(this).attr('data-idNum')+"'><i class='material-icons star-icon'>star_border</i></a>");
  })

  $('.main-content').on('ajax:success', '.star-button-link',function(){
    $(this).replaceWith("<a data-idNum='"+$(this).attr('data-idNum')+"'class='un-star-button-link' data-remote='true' rel='nofollow' data-method='post' href='/unstar/"+$(this).attr('data-idNum')+"'><i class='material-icons star-icon'>star</i></a>");
  })

  //on ajax successes, crossout todo items, and make db calls
  $('.drawer-cell-todo').on('ajax:success', '.complete-button', function(){
    $(this).parent('li').toggleClass('cross-out')
    $(this).replaceWith("<a data-idnum='"+$(this).attr('data-idNum')+"' class='un-complete-button' data-remote='true' rel='nofollow' data-method='post' href='/todos/"+$(this).attr('data-idNum')+"/uncomplete'><i class='material-icons circle'>radio_button_unchecked</i></a>");
  })

  $('.drawer-cell-todo').on('ajax:success', '.un-complete-button', function(){
    $(this).parent('li').toggleClass('cross-out')
    $(this).replaceWith("<a data-idnum='"+$(this).attr('data-idNum')+"' class='complete-button' data-remote='true' rel='nofollow' data-method='post' href='/todos/"+$(this).attr('data-idNum')+"/complete'><i class='material-icons circle'>radio_button_unchecked</i></a>");
  })

  $('.to-do-list-item').on('ajax:success', '.complete-button', function(){
    $(this).parent().toggleClass('cross-out')
    $($(this).find('.complete-button')[0]).replaceWith("<a data-idnum='"+$(this).attr('data-idNum')+"' class='un-complete-button' data-remote='true' rel='nofollow' data-method='post' href='/todos/"+$(this).attr('data-idNum')+"/uncomplete'><i class='material-icons circle'>radio_button_unchecked</i></a>");
  })

  $('.to-do-list-item').on('ajax:success', '.un-complete-button', function(){
    $(this).parent().toggleClass('cross-out')
    $($(this).find('.un-complete-button')[0]).replaceWith("<a data-idnum='"+$(this).attr('data-idNum')+"' class='complete-button' data-remote='true' rel='nofollow' data-method='post' href='/todos/"+$(this).attr('data-idNum')+"/complete'><i class='material-icons circle'>radio_button_unchecked</i></a>");
  })

  $('.new-item').hide();
  $('#cat_category_id').on('change',function(){
    $('#new-category').val("");
    if($('#cat_category_id').val() != ""){
      $('.new-item').hide();
    }
    else{
      $('.new-item').show();
    }
  })

  if($('.pagination').length){
    $('.mdl-layout__content').scroll(function(e) {
      var nextPageUrl = $('.pagination .next_page').attr('href');
        if (nextPageUrl && $('.mdl-layout__content').scrollTop() + $('.mdl-layout__content').height()  >= $('.mdl-layout__content').prop('scrollHeight')) {
          $('.pagination').text("Fetching More Stuffs...");
            return $.getScript(nextPageUrl+"&scroll=true");
        }
    });
    return $(window).scroll();
  }

  $('#new_todo').on('ajax:success',function(){
    $(this).parent().parent().find('ul').append("hello")
  })


})
