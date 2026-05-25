from pathlib import Path

from django.conf import settings
from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')


def react_app(request):
    """
    Serve the Vite build output committed under frontend/dist so Django can
    return the actual frontend after a clean GitHub clone.
    """
    index_path = Path(settings.BASE_DIR) / "frontend" / "dist" / "index.html"
    try:
        html = index_path.read_text(encoding="utf-8")
    except FileNotFoundError:
        return HttpResponseNotFound(
            "Frontend build not found at frontend/dist/index.html. Run `npm run build` in frontend/."
        )

    return HttpResponse(html, content_type="text/html; charset=utf-8")
