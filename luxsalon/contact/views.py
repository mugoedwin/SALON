from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET", "POST"])
def contact_view(request):
    if request.method == "POST":
        # Model + persistence will be added in the next step(s).
        # For now, accept the POST and re-render the page.
        return render(request, "contact.html")

    return render(request, "contact.html")
