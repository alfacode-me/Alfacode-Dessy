var app = new initVue({
    el: '#app',
    data: {
        dessy: {
            nama: "SPK",
            versi: "0.23",
            goal: "Gubernur DKI Jakarta",
            kriteria: []
        },
        matrix: [],
        matrix2: [],
        jumlah: {
            baris: [],
            kolom: [],
            nilaikolom: []
        },
        vektorPrioritas: [],
        em: 0,
        ci: 0,
        ri: 0,
        cr: 0,
        step: [true, false, false]
    },
    methods: {
        addKriteria: function () {
            if (this.dessy.kriteria.length < 15) {
                this.dessy.kriteria.push({
                    nama: ""
                });
                this.matrix.push([]);
                this.vektorPrioritas.push({
                    value: 0
                });
            }
        },
        removeKriteria: function (idx) {
            this.dessy.kriteria.splice(idx, 1);
            this.matrix.splice(idx, 1);
            this.vektorPrioritas.splice(idx, 1);
        },
        createMatrix: function () {
            for (var baris = 0; baris < this.matrix.length; baris++) {
                for (var kolom = 0; kolom < this.matrix.length; kolom++) {
                    var disable = false;
                    if (baris == kolom) {
                        disable = true;
                    }
                    if (this.matrix[baris].length < this.dessy.kriteria.length) {
                        this.matrix[baris].push({
                            baris: baris,
                            kolom: kolom,
                            value: 1,
                            disable: disable
                        });
                    } else {
                        if (baris == kolom) {
                            this.matrix[baris][kolom].disable = true;
                        } else {
                            this.matrix[baris][kolom].disable = false;
                        }
                    }
                }
            }
        },
        clearMatrix: function () {
            for (var baris = 0; baris < this.matrix.length; baris++) {
                this.matrix[baris].splice(0, this.matrix.length);
            }
        },
        changeSkala: function (baris, kolom) {
            this.matrix[kolom][baris].value = 1 / this.matrix[baris][kolom].value;
        },
        pembobotan: function () {
            this.jumlah.nilaikolom = [];
            this.jumlah.baris = [];
            this.jumlah.kolom = [];
            this.matrix2 = [];
            if (this.matrix.length == this.matrix2.length) {
                
            } else {
                for (var baris = 0; baris < this.matrix.length; baris++) {
                    this.jumlah.nilaikolom.push({
                        value: 0
                    });
                    this.jumlah.baris.push({
                        value: 0
                    });
                    this.jumlah.kolom.push({
                        value: 0
                    });
                    this.matrix2.push([]);
                    for (var kolom = 0; kolom < this.matrix.length; kolom++) {
                        this.jumlah.nilaikolom[baris].value += this.matrix[kolom][baris].value;
                    }
                }
                for (var baris = 0; baris < this.matrix.length; baris++) {
                    for (var kolom = 0; kolom < this.matrix.length; kolom++) {
                        this.matrix2[baris].push({
                            baris: baris,
                            kolom: kolom,
                            value: this.matrix[baris][kolom].value / this.jumlah.nilaikolom[kolom].value,
                            disable: true
                        });
                        this.jumlah.baris[baris].value += this.matrix2[baris][kolom].value;
                    }
                }
                for (var baris = 0; baris < this.matrix.length; baris++) {
                    this.vektorPrioritas[baris].value = this.jumlah.baris[baris].value / this.matrix.length;
                    for (var kolom = 0; kolom < this.matrix.length; kolom++) {
                        this.jumlah.kolom[kolom].value += this.matrix2[baris][kolom].value;
                    }
                }
                var jmlkolom = 0
                for (var kolom = 0; kolom < this.jumlah.baris.length; kolom++) {
                    jmlkolom += this.jumlah.baris[kolom].value;
                }
                this.jumlah.kolom.push({
                    value: jmlkolom
                });
                var jmlvektor = 0
                for (var kolom = 0; kolom < this.vektorPrioritas.length; kolom++) {
                    jmlvektor += this.vektorPrioritas[kolom].value;
                }
                this.jumlah.kolom.push({
                    value: jmlvektor
                });
            }
        },
        testCR: function () {
            this.em = 0;
            this.ci = 0;
            this.cr = 0;
            this.ri = 0;
            var tblIR = [{
                n: 1,
                value: 0,
            }, {
                n: 2,
                value: 0,
            }, {
                n: 3,
                value: 0.58,
            }, {
                n: 4,
                value: 0.90,
            }, {
                n: 5,
                value: 1.12,
            }, {
                n: 6,
                value: 1.24,
            }, {
                n: 7,
                value: 1.32,
            }, {
                n: 8,
                value: 1.41,
            }, {
                n: 9,
                value: 1.45,
            }, {
                n: 10,
                value: 1.49,
            }, {
                n: 11,
                value: 1.51,
            }, {
                n: 12,
                value: 1.48,
            }, {
                n: 13,
                value: 1.56,
            }, {
                n: 14,
                value: 1.57,
            }, {
                n: 15,
                value: 1.59,
            }];
            for (var i = 0; i < this.vektorPrioritas.length; i++) {
                this.em += (this.jumlah.nilaikolom[i].value * this.vektorPrioritas[i].value);
            }
            this.ci = (this.em - this.vektorPrioritas.length) / (this.vektorPrioritas.length - 1);
            for (var i = 0; i < tblIR.length; i++) {
                if (this.vektorPrioritas.length == tblIR[i].n) {
                    this.ri = tblIR[i].value;
                }
            }
            this.cr = this.ci / this.ri;
        },  
        simpanDessy: function () {
            $('#btn-simpan').attr('disabled', true);
            $('#btn-simpan').addClass('spinner spinner-default spinner-sm');
            var dessy = this.dessy;
            dessy.penilaian = this.matrix;
            dessy.bobot = this.vektorPrioritas;
            $.post('/dessy/create', {
                data: JSON.stringify(dessy)
            }, function (data) {
                $('#btn-simpan').attr('disabled', false);
                $('#btn-simpan').removeClass('spinner spinner-default spinner-sm');
                if (data.status) {
                    toastr.success('Dessy berhasil tersimpan!', 'Tersimpan', {
                        closeButton: true,
                        progressBar: true
                    });
                } else {
                    toastr.error('Tidak dapat menyimpan Dessy!', 'Gagal Tersimpan', {
                        closeButton: true,
                        progressBar: true
                    });
                }
            })
        }  
    }
});