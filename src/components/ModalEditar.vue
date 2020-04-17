<template>
    <b-modal id="modal-editar" hide-footer>
        <template v-slot:modal-title>
            Editar auto
        </template>
        <div class="row">
            <div class="col-3">Placas:</div>
            <div class="col-9"><input id="placas" ref="placas" placeholder="Placas" type="text" class="form-control"></div>
            <br/>
        </div>
        <br/>
        <div class="row">
            <div class="col-3">Latitud:</div>
            <div class="col-9"><input id="latitud" ref="latitud" placeholder="Latitud" type="number" step="any" class="form-control"></div>
        </div>
        <br/>
        <div class="row">
            <div class="col-3">Longitud:</div>
            <div class="col-9"><input id="longitud" ref="longitud" placeholder="Longitud" type="number" step="any" class="form-control"></div>
        </div>
        <button @click="aceptar" class="btn btn-success">Aceptar</button>
    </b-modal>
</template>

<script>
    import axios from 'axios'
    //import $ from 'jquery'
    export default {
        name: "ModalEditar",
        methods: {
            show: function (obj) {
                let vm = this
                this.$bvModal.show('modal-editar')
                setTimeout(function () {
                    vm.obj = obj
                    document.getElementById("placas").value = obj.placas
                    document.getElementById("latitud").value = obj.lat
                    document.getElementById("longitud").value = obj.lon
                }, 500)
            },
            hide: function () {
                this.$bvModal.hide('modal-1')
            },
            aceptar: function () {
                console.log(this.obj)
                if (this.$refs.placas.value === "" || this.$refs.latitud.value === "" || this.$refs.longitud.value === "")
                    alert("Por favor llene todos los campos")
                else {
                    let vm = this
                    axios({
                        method: 'get',
                        url: `${(process.env.NODE_ENV === 'production')? "": "http://localhost"}/practica/index.php/welcome/updateCarro?placas=${vm.$refs.placas.value}&lat=${vm.$refs.latitud.value}&lon=${vm.$refs.longitud.value}&id=${vm.obj.id}`,
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
        },
        data: function () {
            return {
                obj: null
            }
        }
    }
</script>

<style scoped>

</style>