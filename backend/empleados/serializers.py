from rest_framework import serializers
from .models import Empleado


class EmpleadoSerializer(serializers.ModelSerializer):
    departamento_nombre = serializers.CharField(
        source='get_departamento_display',
        read_only=True
    )

    class Meta:
        model = Empleado
        fields = [
            'id',
            'nombre',
            'email',
            'puesto',
            'departamento',
            'departamento_nombre',
            'salario',
            'fecha_contratacion',
            'activo',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_salario(self, value):
        if value < 0:
            raise serializers.ValidationError('El salario no puede ser negativo.')
        return value

    def validate_nombre(self, value):
        if len(value.strip()) < 2:
            raise serializers.ValidationError('El nombre debe tener al menos 2 caracteres.')
        return value.strip()
