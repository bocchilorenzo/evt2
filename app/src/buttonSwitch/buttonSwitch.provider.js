angular.module('evtviewer.buttonSwitch')

.provider('evtButtonSwitch', function() {

	var defaults = this.defaults;

	this.setDefaults = function(_defaults) {
		defaults = _defaults;
	};

    this.$get = function($timeout, $log, parsedData, evtInterface, evtDialog, evtSelect, Utils, evtImageTextLinking, evtSourcesApparatus) {
        var button    = {},
            collection = {},
            list       = [],
            idx        = 0;
        
        var _console = $log.getInstance('box');

        
        var toggleActive = function() {
            var vm = this;
            vm.active = !vm.active;
        };
        var setActive = function(state) {
            var vm = this;
            vm.active = state;
        };
        var disable = function() {
            var vm = this;
            vm.disabled = true;
        };
        var enable = function() {
            var vm = this;
            vm.disabled = false;
        };
        
        var destroy = function() {
            var tempId = this.uid;
            delete collection[tempId];
            // _console.log('vm - destroy ' + tempId);
        };

		/* GET EVT ICON */
		var getIcon = function(icon) {
			var evtIcon = '';
			switch (angular.lowercase(icon)) {
				case 'add':
					evtIcon = 'icon-evt_add';
					break;
				case 'bookmark':
					evtIcon = 'icon-evt_bookmark';
					break;
				case 'color-legend':
					evtIcon = 'icon-evt_color-legend';
					break;
				case 'filter':
				case 'filters':
					evtIcon = 'icon-evt_filter';
					break;
				case 'font-size':
					evtIcon = 'icon-evt_font-size';
					break;
				case 'font-size-minus':
					evtIcon = 'icon-evt_font-size-minus-alt';
					break;
				case 'font-size-plus':
					evtIcon = 'icon-evt_font-size-plus-alt';
					break;
				case 'font-size-reset':
					evtIcon = 'icon-evt_font-size-reset-alt';
					break;
				case 'heatmap':
					evtIcon = 'icon-evt_heatmap-alt';
					break;
				case 'info':
					evtIcon = 'icon-evt_info';
					break;
				case 'info-alt':
					evtIcon = 'icon-evt_info-alt';
					break;
				case 'itl':
					evtIcon = 'icon-evt_link';
					break;
				case 'list':
					evtIcon = 'icon-evt_list';
					break;
				case 'menu-vert':
					evtIcon = 'icon-evt_more-vert';
					break;
				case 'mode-imgtxt':
					evtIcon = 'icon-evt_imgtxt';
					break;
				case 'mode-txttxt':
					evtIcon = 'icon-evt_txttxt';
					break;
				case 'reading-txt':
					evtIcon = 'icon-evt_txt';
					break;
				case 'mode-collation':
					evtIcon = 'icon-evt_collation';
					break;
                case 'mode-srctxt':
                    evtIcon = 'iconbis-evt_srctxt';
                    break;
                case 'mode-versions':
                    evtIcon = 'iconbis-evt_versions';
                    break;
				case 'mode-bookreader':
					evtIcon = 'icon-evt_bookreader';
					break;
				case 'pin':
					evtIcon = 'icon-evt_pin-alt-on';
					break;
				case 'pin-off':
					evtIcon = 'icon-evt_pin-off';
					break;
				case 'pin-on':
					evtIcon = 'icon-evt_pin-on';
					break;
				case 'remove':
					evtIcon = 'icon-evt_close';
					break;
				case 'search':
					evtIcon = 'icon-evt_search';
					break;
				case 'thumb':
				case 'thumbs':
				case 'thumbnail':
				case 'thumbnails':
					evtIcon = 'icon-evt_thumbnails';
					break;
				case 'txt':
					evtIcon = 'icon-evt_txt';
					break;
				case 'v-align':
					evtIcon = 'icon-evt_align';
					break;
				case 'witnesses':
					evtIcon = 'icon-evt_books';
					break;
			}
			return evtIcon;
		};

		

		button.build = function(scope, vm) {
			var currentId = scope.id || idx++,
				currentType = scope.type || 'default',
				title = scope.title || '',
				label = scope.label || '',
				icon = getIcon(scope.icon) || '',
				iconPos = scope.iconPos || 'right',
				type = scope.type || '',
				value = scope.value || '',
				active = scope.active || false,
				disabled = scope.disabled || false,
				btnType = scope.btnType || '',
                callback = function() { console.log('TODO ' + type); },
                fakeCallback = function() {};
			var scopeHelper = {};

			/* SET CALLBACK */
			switch (type) {
				case 'addWit':
					btnType = 'standAlone';
					callback = function() {
						evtInterface.updateProperty('witnessSelector', true);
						scope.vm.active = false;
					};
					break;
				case 'alignReadings':
					break;
				case 'bookmark':
					callback = function() {
						var vm = this;
						evtInterface.updateSecondaryContentOpened('bookmark');
						evtDialog.openByType('bookmark');
						vm.active = !vm.active;
					};
					break;
				case 'changeViewMode':
					btnType = 'standAlone';
                    callback = function() {
                        var vm = this;
                        if (vm.value !== undefined) {
                            if (vm.value === 'srcTxt') {
                                var sourceId = evtInterface.getCurrentSourceText();
                                evtInterface.updateCurrentSourceText(sourceId);
                            }
                            evtInterface.updateCurrentViewMode(vm.value);
                            evtInterface.updateUrl();
							if (evtInterface.getToolState('ITL') === 'active') {
								if (vm.value === 'imgTxt') {
									evtImageTextLinking.activateITL();
								} else {
									evtImageTextLinking.deactivateITL();
								}
							}
                        }
                    };
					break;
				case 'colorLegend':
					btnType = 'toggler';
					callback = function() {
						var parentBox = scope.$parent.vm;
						if (parentBox.getState('topBoxOpened') && parentBox.getState('topBoxContent') === 'colorLegend') {
							parentBox.toggleTopBox();
						} else {
							var appFilters = parsedData.getCriticalEntriesFiltersCollection(),
								content = '';
							if (appFilters.length > 0) {
								content += '<div class="colorLegend">';
								for (var filter in appFilters.filters) {
									var filterObj = appFilters.filters[filter],
										values = '';
									for (var value in filterObj.values) {
										var valueName = filterObj.values[value].name,
											valueColor = '<i class="colorLegend-filter-color" style="background:' + filterObj.values[value].color + '"></i>';
										values += '<span class="colorLegend-filter-value">' + valueColor + valueName + '</span>';
									}
									if (values !== '') {
										content += '<span class="colorLegend-filter-name">' + filter + '</span>' + values;
									}
								}
								content += '</div>';
							} else {
								content = '<span>No filters available</span>';
							}
							var newTopBoxContent = content || '<span class="errorMsg">There was an error</span>';
							parentBox.updateTopBoxContent(newTopBoxContent);
							parentBox.updateState('topBoxContent', 'colorLegend');
							if (!parentBox.getState('topBoxOpened')) {
								parentBox.toggleTopBox();
							}
						}
					};
					fakeCallback = function() {
						var parentBox = scope.$parent.vm;
						parentBox.updateState('topBoxOpened', false);
					};

					//TODO: toggle buttons already active in same box -> PROVIDER NEEDED!!
					break;
				case 'closeDialog':
					callback = function() {
                        var vm = this;
                        evtDialog.closeAll();
                        evtInterface.updateSecondaryContentOpened('');
                        vm.active = !vm.active;
                    };

                    break;
				case 'closePinned':
                    callback = function() {
						evtInterface.togglePinnedAppBoardOpened();
					};
					break;
				case 'fontSizeDecrease':
					btnType = 'standAlone';
					callback = function() {
						var vm = this;
						scope.$parent.vm.fontSizeDecrease();
						vm.active = !vm.active;
					};
					break;
				case 'fontSizeIncrease':
					btnType = 'standAlone';
					callback = function() {
						var vm = this;
						scope.$parent.vm.fontSizeIncrease();
						vm.active = !vm.active;
					};
					break;
				case 'fontSizeReset':
					btnType = 'standAlone';
					callback = function() {
						var vm = this;
						scope.$parent.vm.fontSizeReset();
						vm.active = !vm.active;
					};
					break;
				case 'fontSizeTools':
					callback = function() {
						var fontSizeBtnState = scope.$parent.vm.getState('fontSizeBtn') || false;
						scope.$parent.vm.updateState('fontSizeBtn', !fontSizeBtnState);
					};
					fakeCallback = function() {
						scope.$parent.vm.updateState('fontSizeBtn', false);
					};
					break;
				case 'front':
					btnType = 'toggler';
					callback = function() {
						var parentBox = scope.$parent.vm;
						if (parentBox.getState('topBoxOpened') && parentBox.getState('topBoxContent') === 'front') {
							parentBox.toggleTopBox();
						} else {
							var content;
							var currentDocument = evtInterface.getCurrentDocument();
							if (currentDocument) {
								var docObj = parsedData.getDocument(currentDocument),
									docFront = docObj ? docObj.front : undefined;

								content = docFront && docFront.parsedContent ? docFront.parsedContent : '<div class="warningMsg">Front is not available</div>';
								scope.$parent.vm.updateTopBoxContent(content);
								scope.$parent.vm.toggleTopBox();
							}
							var newTopBoxContent = content || '<span class="errorMsg">There was an error</span>';
							parentBox.updateTopBoxContent(newTopBoxContent);
							parentBox.updateState('topBoxContent', 'front');
							if (!parentBox.getState('topBoxOpened')) {
								parentBox.toggleTopBox();
							}
						}
					};
					fakeCallback = function() {
						var parentBox = scope.$parent.vm;
						parentBox.updateState('topBoxOpened', false);
					};
					break;
				case 'heatmap':
					btnType = 'standAlone';
					callback = function() {
						var heatMapState = scope.$parent.vm.getState('heatmap') || false;
						scope.$parent.vm.updateState('heatmap', !heatMapState);
					};
					break;
				case 'itl':
					active = evtInterface.getToolState('ITL') === 'active';
					callback = function() {
						var vm = this;
						if (vm.active) { // Activate ITL
							evtImageTextLinking.turnOnITL();
						} else { // Deactivate ITL
							evtImageTextLinking.turnOffITL();
						}
					};
					break;
				case 'openGlobalDialogInfo':
					callback = function() {
						var vm = this;
						evtInterface.updateSecondaryContentOpened('globalInfo');
						evtDialog.openByType('globalInfo');
						vm.active = !vm.active;
					};
					break;
				case 'openGlobalDialogWitnesses':
					callback = function() {
						var vm = this;
						evtInterface.updateSecondaryContentOpened('witnessesList');
						evtDialog.openByType('witnessesList');
						vm.active = !vm.active;
					};
					break;
				case 'openGlobalDialogLists':
					callback = function() {
						var vm = this;
						evtInterface.updateSecondaryContentOpened('entitiesList');
						evtDialog.openByType('entitiesList');
						vm.active = !vm.active;
					};
					break;
				case 'pin':
				case 'pin-on':
				case 'pin-off':
					callback = function() {  };
					break;
				case 'removeWit':
					callback = function() {
						var wit = scope.$parent.vm.witness;
						evtInterface.removeWitness(wit);
						evtInterface.updateUrl();
					};
					break;
				case 'searchInEdition':
					callback = function() {
						var edition = scope.$parent.vm.edition;
						alert('Search in edition level ' + edition + '. Coming Soon...');
					};
					break;
				case 'searchInWit':
					callback = function() {
						var wit = scope.$parent.vm.witness;
						alert('Search in witness ' + wit + '. Coming Soon...');
					};
					break;
				case 'share':
					callback = function() {
						alert(window.location);
					};
					break;
				case 'toggleInfoWit':
					btnType = 'toggler';
					callback = function() {
						var witness = parsedData.getWitness(scope.$parent.vm.witness);
						var newTopBoxContent = witness.description || scope.$parent.vm.topBoxContent;
						scope.$parent.vm.updateTopBoxContent(newTopBoxContent);
						scope.$parent.vm.toggleTopBox();
					};
					fakeCallback = function() {
						scope.$parent.vm.updateState('topBoxOpened', false);
					};
					break;
				case 'toggleFilterApp':
					callback = function() {
						scope.$parent.vm.toggleFilterBox();
					};
					fakeCallback = callback;
					break;
				case 'togglePinned':
					btnType = 'toggler';
					callback = function() {
						evtInterface.togglePinnedAppBoardOpened();
					};
					break;
				case 'witList':
					btnType = 'toggler';
					callback = function() {
						var parentBox = scope.$parent.vm;
						if (parentBox.getState('topBoxOpened') && parentBox.getState('topBoxContent') === 'witList') {
							parentBox.toggleTopBox();
						} else {
							var content = parsedData.getWitnessesListFormatted();
							var newTopBoxContent = content || '<span class="errorMsg">There was an error</span>';
							parentBox.updateTopBoxContent(newTopBoxContent);
							parentBox.updateState('topBoxContent', 'witList');
							if (!parentBox.getState('topBoxOpened')) {
								parentBox.toggleTopBox();
							}
						}
					};
					fakeCallback = function() {
						var parentBox = scope.$parent.vm;
						parentBox.updateState('topBoxOpened', false);
					};
					//TODO: toggle buttons already active in same box -> PROVIDER NEEDED!!
					break;
                /* Case toggleInfoSrc */
                /* Button to show/hide the bibliographic reference of the source */
                /* currently shown in the source-text view | @author --> CM      */
                case 'toggleInfoSrc':
                    btnType = 'toggler';
                    callback = function(){
                        var source = evtSourcesApparatus.getSource(parsedData.getSource(evtInterface.getCurrentSourceText()));
                        //Garantire il collegamento del top box content con la fonte corretta, magari aggiungendo un watch nela direttiva
                        //TODO: Ok, ma come funziona per far sì che il top box content venga aggiornato anche nel momento in cui si cambia con il selettore?
                        var newTopBoxContent = source.bibl || scope.$parent.vm.topBoxContent;
                        scope.$parent.vm.updateTopBoxContent(newTopBoxContent);
                        scope.$parent.vm.toggleTopBox();
                    };
                    fakeCallback = function(){
                        scope.$parent.vm.updateState('topBoxOpened', false);
                    };
                    break;
                /* Case addVer */
                /* It shows the versions available in the versions selector | @author --> CM */
                case 'addVer':
                    btnType = 'standAlone';
                    callback  = function() {
                        evtInterface.updateProperty('versionSelector', true);
                        scope.vm.active = false;
                    };
                    break;
                case 'removeVer':
                    callback = function(){
                        var ver = scope.$parent.vm.version;
                        evtInterface.removeVersion(ver);
                    };
                    break;
                case 'cropText':
                    btnType = 'toggler';
                    callback = function() {
                        var s = scope.$parent.vm;
                        return s;
                    };
                    break;
				default:
					break;
			}

			var doCallback = function() {
				var vm = this;
				button.unselectAllSkipByBtnType(vm.uid, 'standAlone');
				evtSelect.closeAll();
				vm.toggleActive();
				vm.callback();
			};

			scopeHelper = {
				// expansion
				uid: currentId,
				defaults: angular.copy(defaults),

				// model
				currentId: currentId,
				currentType: currentType,
				title: title,
				label: label,
				icon: icon,
				iconPos: iconPos,
				type: type,
				value: value,
				active: active,
				disabled: disabled,

				btnType: btnType,

				// function
				callback: callback,
				doCallback: doCallback,
				fakeCallback: fakeCallback,
				toggleActive: toggleActive,
				setActive: setActive,
				disable: disable,
				enable: enable,
				destroy: destroy
			};

			collection[currentId] = angular.extend(vm, scopeHelper);
			list.push({
				id: currentId,
				type: currentType
			});

			return collection[currentId];
		};


		//
		// Service function
		// 
		button.getById = function(currentId) {
			if (collection[currentId] !== 'undefined') {
				return collection[currentId];
			}
		};

		button.getList = function() {
			return list;
		};

		button.unselectAll = function() {
			angular.forEach(collection, function(currentButton) {
				currentButton.setActive(false);
			});
		};

		button.unselectAllSkipByBtnType = function(currentId, btnTypes) {
			angular.forEach(collection, function(currentButton) {
				if (currentButton.uid !== currentId && btnTypes.indexOf(currentButton.btnType) < 0) {
					if (currentButton.active) {
						currentButton.fakeCallback();
					}
					currentButton.setActive(false);
				}
			});
		};

		button.selectById = function(currentId) {
			if (collection[currentId] !== 'undefined') {
				collection[currentId].setActive(true);
			}
		};

		button.destroy = function(tempId) {
			delete collection[tempId];
		};

		return button;
	};

});