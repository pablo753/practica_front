<template>
	<div>
		<ul class="nav justify-content-center">
			<li class="nav-item">
				<button class="nav-link active btn btn-primary" @click="nuevo">Nuevo</button>
			</li>
			<li class="nav-item">
				<button class="nav-link active btn btn-warning" @click="cerrarSesion">Cerrar sesión</button>
			</li>
		</ul>
		<br/>
		<div id="mapid"></div>
		<ModalConfirmarEliminar ref="ModalConfirmarEliminar"/>
		<ModalEditar ref="ModalEditar"/>
		<ModalInsertar ref="ModalInsertar"/>
	</div>
</template>

<script>

    import axios from "axios/dist/axios.js";
    import $ from 'jquery'
    //import 'leaflet/dist/leaflet.css'
    import * as L from 'leaflet'
    import ModalConfirmarEliminar from "@/components/ModalConfirmarEliminar";
    import ModalEditar from "@/components/ModalEditar";
    import ModalInsertar from "@/components/ModalInsertar";

    export default {
        name: "Carros",
        components: {ModalInsertar, ModalEditar, ModalConfirmarEliminar},
        mounted: function () {
            $(document).ready(function () {

            })

            let mymap = L.map('mapid', {
                center: [18.4496568, -97.5066007],
                zoom: 13,
            });
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1Ijoiam9zbSIsImEiOiJjaWlydjFvc24wMDl5dm5tNmxqcWFoZ3N5In0.ZRCa4WnO-tZ_JjlZHPw22Q'
            }).addTo(mymap);
            console.log(mymap)
            this.id = this.$route.params.id
            let vm = this
            axios({
                method: 'get',
                url: `${(process.env.NODE_ENV === 'production')? "": "http://localhost"}/practica/index.php/welcome/carros/${vm.id}`,
                headers: {
                    'content-type': 'application/json' ,
                    "access-control-allow-origin" : "*"
                }
            }).then(function (response) {
                let arr = response.data
                vm.carros = arr
                for (let i = 0; i < arr.length; i ++) {
                    let placa = `<div>Placa: ${arr[i].placas}</div>`
                    let eliminar = `<button id="eliminar-${i}" class="btn btn-danger">Eliminar</button>`
                    let editar = `<button id="editar-${i}" class="btn btn-warning">Editar</button>`
                    var marker = L.marker([arr[i].lat, arr[i].lon]).addTo(mymap);
                    marker.bindPopup(`${placa}${eliminar}${editar}`).openPopup();
                    $(`#eliminar-${i}`).on('click', function () {
                        vm.eliminar(i)
                    })
                    $(`#editar-${i}`).on('click', function () {
                        vm.editar(i)
                    })
										$('.leaflet-marker-icon').on('click', function () {
											vm.asignacion()
                    })
                }
            });
        },
        data: function () {
            return {
                id: 0,
                carros: []
            }
        },
        methods: {
            asignacion: function() {
                console.log("ASIGNADO")
                let vm = this
                setTimeout(function () {
                    for (let i = 0; i < vm.carros.length; i ++) {
                        $(`#eliminar-${i}`).on('click', function () {
                            vm.eliminar(i)
                        })
                        $(`#editar-${i}`).on('click', function () {
                            vm.editar(i)
                        })
                    }
                }, 500)
						},
            
            cerrarSesion: function() {
              this.$router.push('/')
						},
            
            eliminar: function (id) {
                this.$refs.ModalConfirmarEliminar.show(this.carros[id])
            },
            editar: function (id) {
                this.$refs.ModalEditar.show(this.carros[id])
            },

            nuevo: function () {
                this.$refs.ModalInsertar.show(this.id)
            }
        }
    }
</script>

<style scoped>
	#mapid { height: 500px}
</style>