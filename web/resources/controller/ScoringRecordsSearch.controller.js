/*eslint no-console: 0, no-unused-vars: 0, no-use-before-define: 0, no-redeclare: 0, no-undef: 0*/
//To use a javascript controller its name must end with .controller.js
sap.ui.define([
	"ZHTS/ZHTS/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (BaseController, JSONModel, Fragment, Filter, FilterOperator, FilterType, MessageToast, MessageBox) {
	"use strict";
	
	return BaseController.extend("ZHTS.ZHTS.controller.ScoringRecordsSearch", {

		/**
		 *  Hook for initializing the controller
		 */
		onInit: function () {
			var oViewModel = new JSONModel({
				busy: false,
				hasUIChanges: false,
				usernameEmpty: true,
				order: 0
			});
			this.getView().setModel(oViewModel, "appView");
			
			const router = this.getOwnerComponent().getRouter();
			const route = router.getRoute("scoring_records_search");
			route.attachPatternMatched(this.onPatternMatched, this);
			route.attachBeforeMatched(this.reset, this);
		},

		/* =========================================================== */
		/*           begin: event handlers                             */
		/* =========================================================== */

		onPatternMatched: function (event) {
			BaseController.technicalerror = false;
			
			var oModel = new JSONModel();
			oModel.setData({
				ZMPGCODE: null,
				PRVSY: null,
				LAND1: null,
				RUNID: null
			});
			this.getView().setModel(oModel);

		},

		onSearch: function(oEvent) {
			var ZMPGCODE = this.byId("ZMPGCODE").getValue().trim();
			var PRVSY = this.byId("PRVSY").getValue().trim();
			var LAND1 = this.byId("LAND1").getValue().trim();
			var RUNID = this.byId("RUNID").getValue().trim();
			
			var oModel = new JSONModel();
			oModel.setData({
				ZMPGCODE: ZMPGCODE,
				PRVSY: PRVSY,
				LAND1: LAND1,
				RUNID: RUNID
			});
			sap.ui.getCore().setModel(oModel, "searchq");
            
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("scoring_records", true);
        },
        
        onCancel: function (event) {
			this.byId("ZMPGCODE").setValue('');
			this.byId("PRVSY").setValue('');
			this.byId("LAND1").setValue('');
			this.byId("RUNID").setValue('');
		},

		reset: function (event) {
			
		},

		doNavBack: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("home", true);
		},


		/* =========================================================== */
		/*           end: event handlers                               */
		/* =========================================================== */

		/**
		 * Convenience method for retrieving a translatable text.
		 * @param {string} sTextId - the ID of the text to be retrieved.
		 * @param {Array} [aArgs] - optional array of texts for placeholders.
		 * @returns {string} the text belonging to the given ID.
		 */
		_getText: function (sTextId, aArgs) {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId, aArgs);
		},

		/**
		 * Set busy flag in View Model
		 * @param {boolean} bIsBusy - set or clear busy
		 */
		_setBusy: function (bIsBusy) {
			var oModel = this.getView().getModel("appView");
			oModel.setProperty("/busy", bIsBusy);
		},
		
		/**
		 * Set visible flag in View Model
		 * @param {boolean} bIsVisible - set or clear visibility
		 */
		_setVisible: function (bIsVisible) {
			var oModel = this.getView().getModel("appVisible");
			oModel.setProperty("/visible", bIsVisible);
		}
	});
});