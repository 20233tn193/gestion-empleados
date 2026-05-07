from django.db import models


class Empleado(models.Model):
    DEPARTAMENTOS = [
        ('TI', 'Tecnologías de la Información'),
        ('RH', 'Recursos Humanos'),
        ('VEN', 'Ventas'),
        ('MKT', 'Marketing'),
        ('FIN', 'Finanzas'),
        ('OPE', 'Operaciones'),
    ]

    nombre = models.CharField(max_length=100, verbose_name='Nombre completo')
    email = models.EmailField(unique=True, verbose_name='Correo electrónico')
    puesto = models.CharField(max_length=100, verbose_name='Puesto')
    departamento = models.CharField(
        max_length=3,
        choices=DEPARTAMENTOS,
        default='TI',
        verbose_name='Departamento'
    )
    salario = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Salario'
    )
    fecha_contratacion = models.DateField(verbose_name='Fecha de contratación')
    activo = models.BooleanField(default=True, verbose_name='Activo')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Empleado'
        verbose_name_plural = 'Empleados'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.nombre} - {self.puesto}'
