<template>
    <b-modal id="modal-eliminar" hide-footer>
        <template v-slot:modal-title>
            Eliminar auto
        </template>
        ¿Está seguro de eliminar?
        <br/>
        <br/>
        <button @click="aceptar" class="btn btn-danger">Eliminar</button>
    </b-modal>
</template>

<script>
    import axios from 'axios'
    //import $ from 'jquery'
    export default {
        name: "ModalConfirmarEliminar",
        methods: {
            show: function (obj) {
                let vm = this
                vm.obj = obj
                this.$bvModal.show('modal-eliminar')
            },
            hide: function () {
                this.$bvModal.hide('modal-1')
            },
            aceptar: function () {
                
                let vm = this
                axios({
                    method: 'get',
                    url: `${(process.env.NODE_ENV === 'production')? "": "http://localhost"}/practica/index.php/welcome/deleteCarro?&id=${vm.obj.id}`,
                    headers: {
                        'content-type': 'application/json' ,
                        "access-control-allow-origin" : "*"
                    },
                }).then(function (response) {
                    console.log(response)
                    vm.$router.go()
                });
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