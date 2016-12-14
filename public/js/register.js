var app = new initVue({
    el: '#app',
    data: {
        users: {
            nama_depan: "",
            nama_belakang: "",
            email: "",
            password: "",
            tgl_lahir: "",
            jenkel: "1",
        },
        agree: false,
        gender: [{
            text: "Laki-laki",
            value: "1"
        }, {
            text: "Perempuan",
            value: "2"
        }],
        bulan: [{
            text: "Januari",
            value: "01"
        }, {
            text: "Februari",
            value: "02"
        }, {
            text: "Maret",
            value: "03"
        }, {
            text: "April",
            value: "04"
        }, {
            text: "Mei",
            value: "05"
        }, {
            text: "Juni",
            value: "06"
        }, {
            text: "Juli",
            value: "07"
        }, {
            text: "Agustus",
            value: "08"
        }, {
            text: "September",
            value: "09"
        }, {
            text: "Oktober",
            value: "10"
        }, {
            text: "November",
            value: "11"
        }, {
            text: "Desember",
            value: "12"
        }],
        tgl_lahir: {
            tanggal: "",
            bulan: "01",
            tahun: ""
        }
    },
    methods: {
        daftar: function () {
            var formDaftar = $('#form-daftar');
            if (formDaftar.valid()) {
                $('#btn-daftar').attr('disabled', true);
                $('#btn-daftar').addClass('spinner spinner-default spinner-sm');
                this.users.tgl_lahir = this.tgl_lahir.tanggal + "/" + this.tgl_lahir.bulan + "/" + this.tgl_lahir.tahun;
                app.users.desc = "Ceritakan diri anda kepada orang lain !";
                app.users.image = "user.png";
                $.post("/auth/register", app.users, function (data) {
                    $('#btn-daftar').attr('disabled', false);
                    $('#btn-daftar').removeClass('spinner spinner-default spinner-sm');
                    if (data.status) {
                        toastr.success('Silahkan periksa email anda, untuk konfirmasi pendaftaran!', 'Pendaftaran Berhasil', {
                            closeButton: true,
                            progressBar: true
                        });
                    } else {
                        toastr.error('Alamat Email telah terdaftar!', 'Pendaftaran Gagal', {
                            closeButton: true,
                            progressBar: true
                        });
                    }
                });
            }
        }
    }
});