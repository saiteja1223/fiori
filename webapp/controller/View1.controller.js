sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
], (Controller,MessageToast) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
           this._docType = "INV";
            const oModel=this.getOwnerComponent().getModel("odatav4");
            

 oModel.getMetaModel().fetchEntityContainer()
        .then((oEC) => console.log("✅ V4 metadata OK:", oEC))
        .catch((err) => console.error("❌ Metadata failed:", err));



    
    
const oListBinding = oModel.bindList("/xVSHANEYAxZC_INTCOMPN");

      // Fetch contexts (default: first 100; you can pass start/length if needed)
      oListBinding.requestContexts(0, 100).then((aContexts) => {
        const aData = aContexts.map(oCtx => oCtx.getObject());
        console.log("✅ Records (no $select):", aData);
      }).catch((err) => {
        console.error("❌ Failed to fetch records:", err);
      });
    },
    
handleUploadComplete: function(oEvent) {
			// Please note that the event response should be taken from the event parameters but for our test example, it is hardcoded.
         debugger
			var sResponse = "File upload complete. Status: 200",
				iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
				sMessage;

			if (sResponse) {
				sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
				MessageToast.show(sMessage);
			}
		},

		handleUploadPress: function() {
			var oFileUploader = this.byId("fileUploader");
			oFileUploader.checkFileReadable().then(function() {
				oFileUploader.upload();
			}, function(error) {
				MessageToast.show("The file cannot be read. It may have changed.");
			}).then(function() {
				oFileUploader.clear();
			});
		}
  });
  });




   