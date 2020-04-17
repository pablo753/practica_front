<template>
    <b-modal id="modal-1" hide-footer>
        <template v-slot:modal-title>
            Agregar nuevo auto
        </template>
        <div class="row">
            <div class="col-3">Placas:</div>
            <div class="col-9"><input ref="placas" placeholder="Placas" type="text" class="form-control"></div>
            <br/>
        </div>
        <br/>
        <div class="row">
            <div class="col-3">Latitud:</div>
            <div class="col-9"><input ref="latitud" placeholder="Latitud" type="number" step="any" class="form-control"></div>
        </div>
        <br/>
        <div class="row">
            <div class="col-3">Longitud:</div>
            <div class="col-9"><input ref="longitud" placeholder="Longitud" type="number" step="any" class="form-control"></div>
        </div>
        <button @click="aceptar" class="btn btn-success">Aceptar</button>
    </b-modal>
</template>

<script>
    import axios from "axios/dist/axios.js";

    export default {
        name: "ModalInsertar",
        data: function() {
            return {
                data: 0
            }
        },
        methods: {
            show: function (id) {
                this.id = id
                this.$bvModal.show('modal-1')
            },
            hide: function () {
                this.$bvModal.hide('modal-1')
            },
            aceptar: function () {
                console.log("clic")
                if (this.$refs.placas.value === "" || this.$refs.latitud.value === "" || this.$refs.longitud.value === "")
                    alert("Por favor llene todos los campos")
                else {
                    let vm = this
                    axios({
                        method: 'get',
                        url: `${(process.env.NODE_ENV === 'production')? "": "http://localhost"}/practica/index.php/welcome/nuevoCarro?placas=${vm.$refs.placas.value}&lat=${vm.$refs.latitud.value}&lon=${vm.$refs.longitud.value}&usuario=${vm.id}`,
                        headers: {
                            'content-type': 'application/json' ,
                            "access-control-allow-origin" : "*"
                        },
                    }).then(function (response) {
                        console.log(response)
                        vm.$router.go()
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>