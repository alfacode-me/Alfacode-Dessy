var app = new initVue({
    el: '#app',
    data: {
        dessy: '',
        alternatif: [],
        matrix: [],
        matrix2: [],
        jumlah: [],
        vektorPrioritas: [],
        em: [],
        ci: [],
        ri: [],
        cr: [],
        status: 0
    },
    methods: {
        initMatrix: function () {
            if (this.matrix.length != this.dessy.kriteria.length) {
                for (var i = 0; i < this.dessy.kriteria.length; i++) {
                    this.matrix.push([]);
                }
            }
        },
        addAlternatif: function () {
            if (this.alternatif.length < 25) {
                this.alternatif.push({
                    nama: ""
                });
                for (var i = 0; i < this.matrix.length; i++) {
                    this.matrix[i].push([]);
                }
            }
        },
        removeAlternatif: function (idx) {
            this.alternatif.splice(idx, 1);
            for (var x = 0; x < this.matrix.length; x++) {
                this.matrix[x].splice(idx, 1);
            }
        },
        clearMatrix: function () {
            for (var x = 0; x < this.matrix.length; x++) {
                for (var y = 0; y < this.matrix[x].length; y++) {
                    this.matrix[x][y].splice(0, this.matrix[x].length);
                }
            }
        },
        createMatrix: function () {
            for (var x = 0; x < this.matrix.length; x++) {
                for (var baris = 0; baris < this.matrix[x].length; baris++) {
                    for (var kolom = 0; kolom < this.matrix[x].length; kolom++) {
                        var disable = false;
                        if (baris == kolom) {
                            disable = true;
                        }
                        if (this.matrix[x][baris].length < this.alternatif.length) {
                            this.matrix[x][baris].push({
                                baris: baris,
                                kolom: kolom,
                                value: 1,
                                disable: disable
                            });
                        } else {
                            if (baris == kolom) {
                                this.matrix[x][baris][kolom].disable = true;
                            } else {
                                this.matrix[x][baris][kolom].disable = false;
                            }
                        }
                    }
                }
            }
        },
        changeSkala: function (matrix, baris, kolom) {
            this.matrix[matrix][kolom][baris].value = 1 / this.matrix[matrix][baris][kolom].value;
        },
        pembobotan: function () {
            this.jumlah = [];
            this.matrix2 = [];
            this.vektorPrioritas = [];
            if (this.matrix.length == this.matrix2.length) {

            } else {
                for (var a = 0; a < this.dessy.kriteria.length; a++) {
                    this.matrix2.push([]);
                    this.jumlah.push({
                        nilaikolom: [],
                        baris: [],
                        kolom: []
                    });
                    this.vektorPrioritas.push([]);
                    for (var b = 0; b < this.matrix[a].length; b++) {
                        this.jumlah[a].nilaikolom.push({
                            value: 0
                        });
                        this.jumlah[a].baris.push({
                            value: 0
                        });
                        this.jumlah[a].kolom.push({
                            value: 0
                        });
                        this.matrix2[a].push([]);
                        this.vektorPrioritas[a].push({
                            value: 0
                        });
                        for (var c = 0; c < this.matrix[a][b].length; c++) {
                            this.jumlah[a].nilaikolom[b].value += this.matrix[a][c][b].value;
                            this.matrix2[a][b].push({
                                baris: b,
                                kolom: c,
                                value: 0,
                                disable: true
                            });
                        }
                    }
                    for (var b = 0; b < this.matrix[a].length; b++) {
                        for (var c = 0; c < this.matrix[a][b].length; c++) {
                            this.matrix2[a][b][c].value = this.matrix[a][b][c].value / this.jumlah[a].nilaikolom[c].value;
                            this.jumlah[a].baris[b].value += this.matrix2[a][b][c].value;
                        }
                    }
                    for (var b = 0; b < this.matrix[a].length; b++) {
                        for (var c = 0; c < this.matrix[a][b].length; c++) {
                            this.vektorPrioritas[a][b].value = this.jumlah[a].baris[b].value / this.matrix[a].length;
                        }
                    }
                    for (var b = 0; b < this.matrix[a].length; b++) {
                        for (var c = 0; c < this.matrix[a][b].length; c++) {
                            this.jumlah[a].kolom[b].value += this.matrix2[a][c][b].value;
                        }
                    }
                    var jmlKolom = 0;
                    for (var b = 0; b < this.matrix[a].length; b++) {
                        jmlKolom += this.jumlah[a].baris[b].value;
                    }
                    this.jumlah[a].kolom.push({
                        value: jmlKolom
                    });
                    var jmlVP = 0;
                    for (var b = 0; b < this.matrix[a].length; b++) {
                        jmlVP += this.vektorPrioritas[a][b].value;
                    }
                    this.jumlah[a].kolom.push({
                        value: jmlVP
                    });
                }
            }
        },
        testCR: function () {
            this.status = 0;
            this.em = [];
            this.ci = [];
            this.ri = [];
            this.cr = [];
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
            for (var a = 0; a < this.dessy.kriteria.length; a++) {
                this.em.push({
                    value: 0
                });
                this.ci.push({
                    value: 0
                });
                this.ri.push({
                    value: 0
                });
                this.cr.push({
                    value: 0
                });
                for (var b = 0; b < this.vektorPrioritas[a].length; b++) {
                    this.em[a].value += (this.jumlah[a].nilaikolom[b].value * this.vektorPrioritas[a][b].value);
                }
                this.ci[a].value = (this.em[a].value - this.vektorPrioritas[a].length) / (this.vektorPrioritas[a].length - 1);
                for (var b = 0; b < tblIR.length; b++) {
                    if (this.vektorPrioritas[a].length == tblIR[b].n) {
                        this.ri[a].value = tblIR[b].value;
                    }
                }
                if (this.alternatif.length <= 2) {
                    this.cr[a].value = 0;
                } else {
                    this.cr[a].value = this.ci[a].value / this.ri[a].value;
                }
            }
            for (var s = 0; s < this.cr.length; s++) {
                if (this.cr[s].value >= 0.1) {
                    this.status += 1;
                }
            }
        },
        simpanDessy: function () {
            $('#btn-simpan').attr('disabled', true);
            $('#btn-simpan').addClass('spinner spinner-default spinner-sm');
            var dessy = {
                dessy: this.dessy,
                alternatif: this.alternatif,
                vektorPrioritas: this.vektorPrioritas,
                jumlah: this.jumlah,
                penilaian: this.matrix,
            };
            $.post('/dessy/use', {
                data: JSON.stringify(dessy)
            }, function (data) {
                $('#btn-simpan').attr('disabled', false);
                $('#btn-simpan').removeClass('spinner spinner-default spinner-sm');
                if (data.status) {
                    toastr.success('Dessynta berhasil tersimpan!', 'Tersimpan', {
                        closeButton: true,
                        progressBar: true
                    });
                } else {
                    toastr.error('Tidak dapat menyimpan Dessynta!', 'Gagal Tersimpan', {
                        closeButton: true,
                        progressBar: true
                    });
                }
            })
        }
    }
});

$(function () {
    $.post('/dessy/id/' + $('#dessy-id').val(), {}, function (data) {
        app.dessy = data;
        app.alternatif = [];
        app.initMatrix();
    });
});