"""empleados_project URL Configuration"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def api_root(request):
    return JsonResponse({
        'mensaje': 'API CRUD de Empleados',
        'version': '1.0',
        'endpoints': {
            'empleados': '/api/empleados/',
            'admin': '/admin/',
        }
    })


urlpatterns = [
    path('', api_root),
    path('admin/', admin.site.urls),
    path('api/', include('empleados.urls')),
]
