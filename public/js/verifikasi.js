var app = new initVue({
    el: '#app',
    data: {
        users: {
            username: "",
            kode_verifikasi: ""
        },
    },
    methods: {
        verifikasi: function () {
            if ($('#form-verifikasi').valid()) {
                $('#btn-verifikasi').attr('disabled', true);
                $('#btn-verifikasi').addClass('spinner spinner-default spinner-sm');
                $.post("/auth/verifikasi", app.users, function (data) {
                    $('#btn-verifikasi').attr('disabled', false);
                    $('#btn-verifikasi').removeClass('spinner spinner-default spinner-sm');
                    if (data.status == 1) {
                        window.location.href = "/dashboard";
                    } else if (data.status == 2) {
                        toastr.error('Kode tidak valid!', 'Verifikasi Gagal', {
                            closeButton: true,
                            progressBar: true
                        });
                    } else {
                        toastr.error('Username telah terdaftar, coba username lain!', 'Verifikasi Gagal', {
                            closeButton: true,
                            progressBar: true
                        });
                    }
                });
            }
        }
    }
});