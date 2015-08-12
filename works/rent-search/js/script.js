$(document).ready( function() {
    $('.default-text').bind( 'focus', function(  ) {
        if( $(this).attr('value') === $(this).val() ){
            $(this).val('');
        }
    });

    $('.default-text').bind( 'blur', function(  ) {
        if( '' === $(this).val() ){
            $(this).val( $(this).attr('value') );
        }
    });

    $('#user-notes').val( $('#user-notes').attr('value') );

    $.core = {};

    $.core.msg = function(type, text, t) {
        var n = noty({
            text        : text,
            type        : type,
            dismissQueue: false,
            layout      : 'topCenter',
            theme       : 'defaultTheme'
        });
        setTimeout(function () {
            $.noty.close(n.options.id);
        }, t || 3000);
        return n;
    }

    $.core.vellFormatDigit = function(d) {
        var res = '';
        d = '' + d;
        var n = d.length;
        for (var i = n; i > 0; --i) {
            if ((n - i) % 3 === 0) {
                res = ' ' + res;
            }
            res = '' + d[i-1] + res;
        }
        return res;
    }

    $.core.collect = function() {
        var fields = $('.default-text') || [];
        for( var i = 0; i < fields.length; i++ ) {
            if( $(fields[i]).attr('value') === $(fields[i]).val() ){
                $(fields[i]).val('-');
            }
        };
        $('#amount').removeAttr('disabled');
        var data = $("#contacts").serialize() + '&' + $("#params").serialize();
        $('#amount').attr('disabled','disabled');
        if( '' === $('#user-notes').val() ){
            $('#user-notes').val( $('#user-notes').attr('value') );
        }
        return data;
    };

    $.core.sendForm = function() {
        var msg = $.core.collect();
        $.core.inProcess = true;
        $('.red-button').fadeOut('slow')
        $.ajax({
            type: "POST",
            url: "./send.php",
            data: msg,
            success: function(data) {
                $.core.msg('success', "Ваша заявка отправлена!<br>Наш специалист свяжется с Вами в ближайшее время.", 8000);
                $.core.inProcess = false;
                $('.red-button').fadeIn('slow')
            },
            error:  function(xhr, str){
                $.core.msg('error', "Возникла ошибка! <br>Попробуйте повторить запрос позже.");
                $.core.inProcess = false;
                $('.red-button').fadeIn('slow')
            }
        });
    };

    $.core.validateForms = function() {
        if( $('#name').val() !== '' && $('#name').val() !== $('#name').attr('value') &&
              ( $('#phone').val() !== '' && $('#phone').val() !== $('#phone').attr('value') ||
                $('#email').val() !== '' && $('#email').val() !== $('#email').attr('value') )
            ) {
            return true;
        } else {
            return false;
        }
    };

    $.core.inProcess = false;

    $('.red-button').click( function() {
        if(false === $.core.inProcess) {
            if(true === $.core.validateForms()) {
                $.core.sendForm();
            } else {
                $.core.msg('error', "Введите контактные данные!");
            }
        }
    });

    $( "#slider-range" ).slider({
        range: true,
        min: 1000,
        max: 50000,
        step: 500,
        values: [ 6000, 15000 ],
        slide: function( event, ui ) {
            $( "#amount" ).val( "От " + $.core.vellFormatDigit( ui.values[ 0 ] ) + " до "
                + $.core.vellFormatDigit( ui.values[ 1 ] ) + " руб. / месяц" );
        }
    });
    $( "#amount" ).val( "От " + $.core.vellFormatDigit( $( "#slider-range" ).slider( "values", 0 ) ) +
        " до " + $.core.vellFormatDigit( $( "#slider-range" ).slider( "values", 1 ) ) + " руб. / месяц" );

});
