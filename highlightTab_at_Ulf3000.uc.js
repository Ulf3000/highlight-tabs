var highlightTab_at_Ulf3000 = {
	init: function () {
		Services.obs.addObserver(highlightTab_at_Ulf3000.SMObserver, "sessionmanager:restoring-window", false);
		window.addEventListener("SSWindowRestored", highlightTab_at_Ulf3000.windowRestore, false); // hack around browser.sessionstore.restore_tabs_lazily
		window.document.addEventListener("SSTabRestoring", highlightTab_at_Ulf3000.reHL, false);
		let tabbrowser = window.document.getElementById("tabbrowser-tabs");
		tabbrowser.onmousedown = highlightTab_at_Ulf3000.clickTab;
		highlightTab_at_Ulf3000.createMenu();
	},
	SMObserver: { //for sesion manager addon
		observe: function (aSubject, aTopic, aData) {
			alreadyRestored = false;
			if (aSubject)
				highlightTab_at_Ulf3000.windowRestore(aSubject);
		}
	},
	createMenu: function () {
		let menu = document.createXULElement('menu');
		menu.setAttribute("id", "highlightTab_at_Ulf3000_Menu");
		menu.setAttribute("label", "Highlight Tab(s)");
		let menupopup = menu.appendChild(document.createXULElement('menupopup'));
		let grid = menupopup.appendChild(document.createXULElement('grid'));
		let rows = grid.appendChild(document.createXULElement('rows'));
		rows.style.display = "grid";

		let row1 = rows.appendChild(document.createXULElement('row'));
		let row1i1 = row1.appendChild(document.createXULElement('menuitem'));
		row1i1.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#F04F61')");
		row1i1.setAttribute('style', 'background : #F04F61 !important;-moz-appearance: unset !important;min-height: 17px !important;');
		let row1i2 = row1.appendChild(document.createXULElement('menuitem'));
		row1i2.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#f8ada8')");
		row1i2.setAttribute('style', 'background : #f8ada8 !important;-moz-appearance: unset !important;min-height: 17px !important;');

		let row2 = rows.appendChild(document.createXULElement('row'));
		let row2i1 = row2.appendChild(document.createXULElement('menuitem'));
		row2i1.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#f48121')");
		row2i1.setAttribute('style', 'background : #f48121 !important;-moz-appearance: unset !important;min-height: 17px !important;');
		let row2i2 = row2.appendChild(document.createXULElement('menuitem'));
		row2i2.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#FAAD5F')");
		row2i2.setAttribute('style', 'background : #FAAD5F !important;-moz-appearance: unset !important;min-height: 17px !important;');

		let row3 = rows.appendChild(document.createXULElement('row'));
		let row3i1 = row3.appendChild(document.createXULElement('menuitem'));
		row3i1.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#FFC94D')");
		row3i1.setAttribute('style', 'background : #FFC94D !important;-moz-appearance: unset !important;min-height: 17px !important;');
		let row3i2 = row3.appendChild(document.createXULElement('menuitem'));
		row3i2.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#FFE1A5')");
		row3i2.setAttribute('style', 'background : #FFE1A5 !important;-moz-appearance: unset !important;min-height: 17px !important;');

		let row4 = rows.appendChild(document.createXULElement('row'));
		let row4i1 = row4.appendChild(document.createXULElement('menuitem'));
		row4i1.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#A4CF4D')");
		row4i1.setAttribute('style', 'background : #A4CF4D !important;-moz-appearance: unset !important;min-height: 17px !important;');
		let row4i2 = row4.appendChild(document.createXULElement('menuitem'));
		row4i2.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#C5DE92')");
		row4i2.setAttribute('style', 'background : #C5DE92 !important;-moz-appearance: unset !important;min-height: 17px !important;');

		let row5 = rows.appendChild(document.createXULElement('row'));
		let row5i1 = row5.appendChild(document.createXULElement('menuitem'));
		row5i1.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#32B0CF')");
		row5i1.setAttribute('style', 'background : #32B0CF !important;-moz-appearance: unset !important;min-height: 17px !important;');
		let row5i2 = row5.appendChild(document.createXULElement('menuitem'));
		row5i2.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#8dcee2')");
		row5i2.setAttribute('style', 'background : #8dcee2 !important;-moz-appearance: unset !important;min-height: 17px !important;');

		let row6 = rows.appendChild(document.createXULElement('row'));
		let row6i1 = row6.appendChild(document.createXULElement('menuitem'));
		row6i1.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#8c58a8')");
		row6i1.setAttribute('style', 'background : #8c58a8 !important;-moz-appearance: unset !important;min-height: 17px !important;');
		let row6i2 = row6.appendChild(document.createXULElement('menuitem'));
		row6i2.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#D4B8CF')");
		row6i2.setAttribute('style', 'background : #D4B8CF !important;-moz-appearance: unset !important;min-height: 17px !important;');

		let row7 = rows.appendChild(document.createXULElement('row'));
		let row7i1 = row7.appendChild(document.createXULElement('menuitem'));
		row7i1.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#A27D60')");
		row7i1.setAttribute('style', 'background : #A27D60 !important;-moz-appearance: unset !important;min-height: 17px !important;');
		let row7i2 = row7.appendChild(document.createXULElement('menuitem'));
		row7i2.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '#C7B49C')");
		row7i2.setAttribute('style', 'background : #C7B49C !important;-moz-appearance: unset !important;min-height: 17px !important;');



		let noColorItem = menupopup.appendChild(document.createXULElement('menuitem'));
		noColorItem.setAttribute("oncommand", "highlightTab_at_Ulf3000.highlightTabFromMenu(event, '')");
		noColorItem.setAttribute('label', 'None');


		let tabContextMenu = document.getElementById('tabContextMenu');
		tabContextMenu.insertBefore(menu, document.getElementById('context_pinTab').nextSibling);
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
			//console.log(e)
			let tab = e.target.closest('.tabbrowser-tab');
			if (tab) {
				highlightTab_at_Ulf3000.highlightTabFromClick(tab, '#C5DE92');
			}
		}
	},
	highlightTabFromMenu: function (e, c) {


		if (gBrowser.multiSelectedTabsCount > 0) {
			console.log("multiSelectedTabsCount");
			for (let tab of gBrowser.selectedTabs) {
				tab.style.setProperty('background', c, "important");
				SessionStore.setCustomTabValue(tab, "highlighted_HT", c);
			}
		} else {
			let tab = TabContextMenu.contextTab;
			tab.style.setProperty('background', c, "important");
			SessionStore.setCustomTabValue(tab, "highlighted_HT", c);
		}
	},
	highlightTabFromClick: function (node, c) {
		//console.log(e)
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
