$(() => {
    var app = new initVue({
        el: '#app',
        data: {
            message: 'Hello Alfacode!',
            seen: true,
            goal: null
        }
    });

    $('[data-toggle="tooltip"]').tooltip();
});