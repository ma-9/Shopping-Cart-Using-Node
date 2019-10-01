Stripe.setPublishableKey('pk_test_k5AUVQWmgqJggdRPchDNlfYA00SMnJDRVJ');

var $form = $('#checkout-form');

$form.submit((event)=>{
    $('#charge-error').addClass('d-none');
    $form.find('#btn').prop('disabled',true)
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        expMonth: $('#card-expiry-month').val(),
        expYear: $('#card-expiry-year').val(),
        name: $('#card-name').val()
    },stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response){
    if (response.error){
        // Showinng the error on the form
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('d-none');
        $form.find('#btn').prop('disabled',false);    // Re-enable the submission
    }else{
        // Get the Token ID
        var token = response.id;

        // Insert the token into form so token get submitted to the server.
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));

        // Submit the form
        $form.get(0).submit();
    }
}