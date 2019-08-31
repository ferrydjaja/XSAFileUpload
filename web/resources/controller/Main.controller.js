sap.ui.define([
    "ZHTS/ZHTS/controller/BaseController",
    "sap/m/MessageToast"
], function(BaseController, MessageToast) {
    "use strict";

    return BaseController.extend("ZHTS.ZHTS.controller.Main", {

        onInit: function(evt) {   
            var oModelMenuTilesTraining = this.getOwnerComponent().getModel("MenuTilesModelTraining");
            this.getView().byId("menutilescontainerTraining").setModel(oModelMenuTilesTraining);			
            
            var oModelMenuTilesScoring = this.getOwnerComponent().getModel("MenuTilesModelScoring");
            this.getView().byId("menutilescontainerScoring").setModel(oModelMenuTilesScoring);
        },

        handlePressTraining: function(oEvent) {
            var sPath = oEvent.getSource().getBindingContext().getPath();
			var oModel = this.getView().byId("menutilescontainerTraining").getModel();
			var oContext = oModel.getProperty(sPath);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			if(oContext.contenttext === "Train") {
				this.onTrain();
			}

			if(oContext.contenttext === "Training Status") {
				this.onTrainStatus();
			}
			
			if(oContext.contenttext === "Training Records") {
				oRouter.navTo("app_search", true); 
			}
        },
        
        handlePressScoring: function(oEvent) {
            var sPath = oEvent.getSource().getBindingContext().getPath();
			var oModel = this.getView().byId("menutilescontainerScoring").getModel();
			var oContext = oModel.getProperty(sPath);

			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			if(oContext.contenttext === "Upload New Material") {
				oRouter.navTo("upload", true);
			}
			
			if(oContext.contenttext === "Scoring") {
				this.onScore();
			}
			
			if(oContext.contenttext === "Scoring Status") {
				this.onScoringStatus();
			}
			
			if(oContext.contenttext === "View Scoring Records") {
				oRouter.navTo("scoring_records_search", true); 
			}
        },
        
        onTrain: function (evt) {
			console.log("Trigger Training");
			
			$.ajax({
				dataType: "json",
				url: 'https://szidh1d.pfizer.com:4300/ACCESS_TEST/FD/LIB/trainstats.xsjs', 
				//data: data,  
				timeout: 10 * 1000
			})
			.success(function (data) {
				console.log(data.RES[0].VALUE);
				
				if(data.RES[0].VALUE === "S") {
					MessageToast.show("Training is still in progress. You only can start training again once the training is complete");
				} else {
					console.log("Training is complete, run training");
					MessageToast.show("Training has been executed");
					
					$.ajax({
						dataType: "json",
						url: 'https://szidh1d.pfizer.com:4300/ACCESS_TEST/FD/LIB/train.xsjs', 
						//data: data,  
						timeout: 10 * 1000 
					})
					.done(function (data) {
						console.log(data);
					})
					.fail(function (jqXHR, textStatus, err) {
						console.log(err);
					});					
				}
			})
			.fail(function (jqXHR, textStatus, err) {
				console.log(err);
			});			
			
		},
		
		onTrainStatus: function(evt) {
			console.log("Check Training Status");
			
			$.ajax({
				dataType: "json",
				url: 'https://szidh1d.pfizer.com:4300/ACCESS_TEST/FD/LIB/trainstats.xsjs', 
				//data: data,  
				timeout: 10 * 1000
			})
			.success(function (data) {
				console.log(data.RES[0].VALUE);
				
				if(data.RES[0].VALUE === "S") {
					MessageToast.show("Training is in progress");
				} else {
					MessageToast.show("Training is completed");
				}
			})
			.fail(function (jqXHR, textStatus, err) {
				console.log(err);
			});
		},
		
		onScore: function (evt) {
			console.log("Trigger Scoring");
			
			$.ajax({
				dataType: "json",
				url: 'https://szidh1d.pfizer.com:4300/ACCESS_TEST/FD/LIB/scorestats.xsjs', 
				//data: data,  
				timeout: 10 * 1000
			})
			.success(function (data) {
				console.log(data.RES[0].VALUE);
				
				if(data.RES[0].VALUE === "S") {
					MessageToast.show("Scoring is still in progress. You only can start scoring again once the scoring is complete");
				} else {
					console.log("Scoring is complete, run Scoring");
					MessageToast.show("Scoring has been executed");
					
					$.ajax({
						dataType: "json",
						url: 'https://szidh1d.pfizer.com:4300/ACCESS_TEST/FD/LIB/score.xsjs', 
						//data: data,  
						timeout: 10 * 1000 
					})
					.done(function (data) {
						console.log(data);
					})
					.fail(function (jqXHR, textStatus, err) {
						console.log(err);
					});					
				}
			})
			.fail(function (jqXHR, textStatus, err) {
				console.log(err);
			});		
		},
		
		onScoringStatus: function(evt) {
			console.log("Check Scoring Status");
			
			$.ajax({
				dataType: "json",
				url: 'https://szidh1d.pfizer.com:4300/ACCESS_TEST/FD/LIB/scorestats.xsjs', 
				//data: data,  
				timeout: 10 * 1000
			})
			.success(function (data) {
				console.log(data.RES[0].VALUE);
				
				if(data.RES[0].VALUE === "S") {
					MessageToast.show("Scoring is in progress");
				} else {
					MessageToast.show("Scoring is completed");
				}
			})
			.fail(function (jqXHR, textStatus, err) {
				console.log(err);
			});
		}
	});
});