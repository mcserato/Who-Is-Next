'use strict';

$(document).ready( function () {
        
    $('.modal-trigger')
        .leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            ready: function() { }, // Callback for Modal open
            complete: function() { } // Callback for Modal close
        }
    );


    function readBlob(opt_startByte, opt_stopByte) {

        var files = document.getElementById('file-path').files;
        if (!files.length) {
          alert('Please select a file!');
          return;
        }

        var file = files[0];
        var start = parseInt(opt_startByte) || 0;
        var stop = parseInt(opt_stopByte) || file.size - 1;

        var reader = new FileReader();

        // If we use onloadend, we need to check the readyState.
        reader.onloadend = function(evt) {
          if (evt.target.readyState == FileReader.DONE) { // DONE == 2
            let nope = evt.target.result.split(/[ ,\n]+/);


            for (var i = 0; i < ( nope.length/9 ); i++) {
                /*$.ajax({
                    url: "/api/student",
                    method: 'POST',
                    dataType: "JSON",
                    data: {
                        student_number: nope[0 + ( 9 * i ) ],
                        first_name:     nope[1 + ( 9 * i ) ],
                        middle_name:    nope[2 + ( 9 * i ) ],
                        last_name:      nope[3 + ( 9 * i ) ],
                        college:        nope[4 + ( 9 * i ) ],
                        course:         nope[5 + ( 9 * i ) ],
                        gender:         nope[6 + ( 9 * i ) ],
                        birthday:       nope[7 + ( 9 * i ) ]

                    },
                    success: function(data){
                        if(!data){
                            return Materialize.toast("Error in Logout. Please try again !",2500);
                        }

                        localStorage.clear();
                        Materialize.toast(data,2500);
                        window.location.href = '/';
                    },
                    error: function(err){
                        return Materialize.toast(err.responseText,2500);
                    }
                });*/
            };
            $('#byte_content').append($('<span></span>').html(evt.target.result));
          }
        };

        var blob = file.slice(start, stop + 1);
        reader.readAsBinaryString(blob);
      }
      
      document.querySelector('.readBytesButtons').addEventListener('click', function(evt) {
        if (evt.target.tagName.toLowerCase() == 'button') {
          var startByte = evt.target.getAttribute('data-startbyte');
          var endByte = evt.target.getAttribute('data-endbyte');
          readBlob(startByte, endByte);
        }
      }, false);

    $('#agree')
        .click(function(){
            console.log("OverLord");            
        }
    );

    console.log($('#file-path').val());
    


});
