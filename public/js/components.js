Vue.component('add-kriteria', {
    props: ['index'],
    template: `<div class="form-group has-feedback">
        <label class="col-sm-3 col-md-4 control-label">Kriteria {{index + 1}}</label>
        <div class="col-sm-6 col-md-5">
            <div class="input-group">
                <input v-model="$parent.dessy.kriteria[index].nama" name="kriteria{index + 1}" class="form-control" type="text">
                <div class="input-group-btn">
                    <button @click="$parent.removeKriteria(index)" class="btn btn-danger" title="" data-container="body" data-placement="top" data-toggle="tooltip" type="button" data-original-title="Hapus kriteria">
                        <span class="icon icon-close icon-fw"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>`
});

Vue.component('add-alternatif', {
    props: ['index'],
    template: `<div class="form-group has-feedback">
        <label class="col-sm-3 col-md-4 control-label">Alternatif {{index + 1}}</label>
        <div class="col-sm-6 col-md-5">
            <div class="input-group">
                <input v-model="$parent.alternatif[index].nama" name="alternatif{index + 1}" class="form-control" type="text">
                <div class="input-group-btn">
                    <button @click="$parent.removeAlternatif(index)" class="btn btn-danger" title="" data-container="body" data-placement="top" data-toggle="tooltip" type="button" data-original-title="Hapus alternatif">
                        <span class="icon icon-close icon-fw"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>`
});

Vue.component('cell-input', {
    props: ['matrix'],
    template: `<input :change="$parent.changeSkala(matrix.baris, matrix.kolom)" v-model="$parent.matrix[matrix.baris][matrix.kolom].value" style="min-width:75px" min="1" max="9" type="number" class="form-control" :disabled="matrix.disable">`
});

Vue.component('cell-input1', {
    props: ['matrix','index'],
    template: `<input :change="$parent.changeSkala(index, matrix.baris, matrix.kolom)" v-model="$parent.matrix[index][matrix.baris][matrix.kolom].value" style="min-width:75px" min="1" max="9" type="number" class="form-control" :disabled="matrix.disable">`
});

Vue.component('cell-matrix', {
    props: ['matrix'],
    template: `<input v-model="($parent.matrix2[matrix.baris][matrix.kolom].value).toFixed(2)" style="min-width:75px" min="0" max="1" type="number" class="form-control text-center" disabled="">`
});

Vue.component('cell-matrix2', {
    props: ['matrix','index'],
    template: `<input v-model="($parent.matrix2[index][matrix.baris][matrix.kolom].value).toFixed(2)" style="min-width:75px" min="0" max="1" type="number" class="form-control text-center" disabled="">`
});