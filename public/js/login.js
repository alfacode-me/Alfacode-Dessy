var app = new initVue({
    el: '#app',
    data: {
        users: {
            username: "",
            password: "",
            remember: false
        },
    },
    methods: {
        masuk: function () {
            if ($('#form-masuk').valid()) {
                $('#btn-masuk').attr('disabled', true);
                $('#btn-masuk').addClass('spinner spinner-default spinner-sm');
                $.post("/auth/login", app.users, function (data) {
                    $('#btn-masuk').attr('disabled', false);
                    $('#btn-masuk').removeClass('spinner spinner-default spinner-sm');
                    if (data.status) {
                        window.location.href = "/dashboard";
                    } else {
                        toastr.error('Username serta password tidak sesuai!', 'Gagal Masuk', {
                            closeButton: true,
                            progressBar: true
                        });
                    }
                });
            }
        }
    }
});