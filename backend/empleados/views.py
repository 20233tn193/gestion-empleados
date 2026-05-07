from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Empleado
from .serializers import EmpleadoSerializer


class EmpleadoViewSet(viewsets.ModelViewSet):
    """
    ViewSet que expone las operaciones CRUD para Empleados:
    - GET    /api/empleados/        -> Listar todos los empleados
    - POST   /api/empleados/        -> Crear un nuevo empleado
    - GET    /api/empleados/{id}/   -> Obtener un empleado específico
    - PUT    /api/empleados/{id}/   -> Actualizar un empleado completo
    - PATCH  /api/empleados/{id}/   -> Actualizar parcialmente
    - DELETE /api/empleados/{id}/   -> Eliminar un empleado
    """
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nombre', 'email', 'puesto']
    ordering_fields = ['nombre', 'salario', 'fecha_contratacion', 'created_at']

    @action(detail=False, methods=['get'])
    def departamentos(self, request):
        """Retorna la lista de departamentos disponibles."""
        deps = [{'codigo': k, 'nombre': v} for k, v in Empleado.DEPARTAMENTOS]
        return Response(deps)
