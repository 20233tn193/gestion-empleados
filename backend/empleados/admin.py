from django.contrib import admin
from .models import Empleado


@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'email', 'puesto', 'departamento', 'salario', 'activo')
    list_filter = ('departamento', 'activo')
    search_fields = ('nombre', 'email', 'puesto')
    list_editable = ('activo',)
    ordering = ('-created_at',)
