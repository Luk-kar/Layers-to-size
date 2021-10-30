#include "./helpers/isActiveDocument.jsx"
#include "./helpers/isPSDDoc.jsx"

function checkConditionsForScript() {
    if (!isActiveDocument()) {
        alert("You do not choose any file!");
        return false;
    }

    if (!isPSDDoc()) {
        alert("Your opened document is not PSD file!");
        return false;
    }

    return true;
}
