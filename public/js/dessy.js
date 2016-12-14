$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

(function ($) {
    var $formWizard;
    var $form1;

    $formWizard = $("#form-wizard");
    $form1 = $("#form1");

    $form1.validate({
        errorClass: 'has-error',
        validClass: 'has-info',
        errorPlacement: function ($error, $element) {},
        highlight: function (element, errorClass, validClass) {
            $(element)
                .closest('.form-group')
                .addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element)
                .closest('.form-group')
                .addClass(validClass).removeClass(errorClass);
        }
    });

    $formWizard.bootstrapWizard({
        nextSelector: '.btn-next',
        previousSelector: '.btn-previous',
        tabClass: 'steps',
        onNext: function (tab, navigation, index) {
            return $form1.valid();
        },
        onPrevious: function (tab, navigation, index) {
            return $form1.valid();
        },
        onTabClick: function (tab, navigation, index) {
            return false;
        }
    });
})(jQuery);