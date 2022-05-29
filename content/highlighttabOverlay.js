var highlightTab_at_Ulf3000 = {
	init: function () {
		Services.obs.addObserver(highlightTab_at_Ulf3000.SMObserver, "sessionmanager:restoring-window", false);
		window.addEventListener("SSWindowRestored", highlightTab_at_Ulf3000.windowRestore, false); // hack around browser.sessionstore.restore_tabs_lazily
		window.document.addEventListener("SSTabRestoring", highlightTab_at_Ulf3000.reHL, false);
		let tabbrowser = window.document.getElementById("tabbrowser-tabs");
		tabbrowser.onmousedown = highlightTab_at_Ulf3000.clickTab;
	},
	SMObserver: { //for sesion manager addon
		observe: function (aSubject, aTopic, aData) {
			alreadyRestored = false;
			if (aSubject)
				highlightTab_at_Ulf3000.windowRestore(aSubject);
		}
	},
	windowRestore: function (e) {
		for (let tab of gBrowser.tabs) {
			highlightTab_at_Ulf3000.reHL2(tab);
		}
	},
	reHL: function (e) { // for SSTabRestoring (session-restore, tab restore, other addons)
		//console.log("reHL");
		let xxx = SessionStore.getCustomTabValue(e.target, "highlighted_HT");
		if (xxx) {
			e.target.style.setProperty('background', xxx, "important");
		};
	},
	reHL2: function (tab) { // for SSTabRestoring (session-restore, tab restore, other addons)
		//console.log("reHL2");
		let xxx = SessionStore.getCustomTabValue(tab, "highlighted_HT");
		if (xxx) {
			tab.style.setProperty('background', xxx, "important");
		};
	},
	clickTab: function (e) {
		//e.preventDefault();  // ToDO ??? still selects the tab
		if (e.button == 0 && e.altKey) {
			console.log(e.target.className)
			if(e.target.className == "tab-content")
				highlightTab_at_Ulf3000.highlightTab(e.target.parent, '#C5DE92');
				
			
		} 
	},
	highlightTab: function (node, c) {
		console.log(node)
		console.log(TabContextMenu.contextTab)
		if (c == '' || c == SessionStore.getCustomTabValue(node, "highlighted_HT")) {
			node.style.removeProperty('background');
			SessionStore.deleteCustomTabValue(node, "highlighted_HT");
		} else {
			node.style.setProperty('background', c, "important");
			SessionStore.setCustomTabValue(node, "highlighted_HT", c);
		}
	}
};
highlightTab_at_Ulf3000.init();
