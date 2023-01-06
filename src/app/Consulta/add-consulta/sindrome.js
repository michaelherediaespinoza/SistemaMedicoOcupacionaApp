
            <script>
                angular.module('imcApp', [])
                    .controller('ImcController', function ($scope) {
                        $scope.calculaImc = function () {
                            $scope.imc = $scope.peso / ($scope.altura * $scope.altura);
                            if ($scope.imc < 18.5) {
                                $scope.situacao = 'Abaixo do peso';
                            } else if ($scope.imc >= 18.5 && $scope.imc < 30) {
                                $scope.situacao = 'Peso normal';
                            } else if ($scope.imc >= 30) {
                                $scope.situacao = 'Obesidade';
                            }
                            $scope.exibeResultados = true;
                        }
                    });
            </script>