## QCode POS

const haveCompleteFlavors = newFlavors.filter((nf) => nf.flavorType === FlavorTypeEnum.Complete);

if (haveCompleteFlavors.length >= 1) {
toastsManager.showToast('error', 'Solo puedes agregar un sabor completo');
return;
}

const flavorToAdd = flavors.find((f) => f.id === flavorId);

if (haveCompleteFlavors.length === 1 && flavorToAdd?.type === FlavorTypeEnum.Complete) {
toastsManager.showToast('error', 'Solo puedes agregar un sabor completo');
return;
}

const haveHalfFlavors = newFlavors.filter((nf) => nf.flavorType === FlavorTypeEnum.Half);

if (haveHalfFlavors.length >= 2) {
toastsManager.showToast('error', 'Solo puedes agregar dos mitades de sabores');
return;
}

if (haveHalfFlavors.length === 1 && flavorToAdd?.type === FlavorTypeEnum.Complete) {
toastsManager.showToast('error', 'Solo puedes agregar dos mitades de sabores');
return;
}
