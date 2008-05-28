/*
Copyright 2007 - 2008 University of Toronto

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://source.fluidproject.org/svn/LICENSE.txt
*/

var fluid = fluid || {};

(function (fluid) {
    var createLayoutCustomizer = function (layout, perms, grabHandle, orderChangedCallbackUrl, options) {
        // Configure options
        var rOptions = options || {};
        rOptions.role = fluid.roles.GRID;

        var lhOptions = {};
        lhOptions.orderChangedCallbackUrl = orderChangedCallbackUrl;
        lhOptions.dropWarningId = rOptions.dropWarningId;

        var reordererRoot = fluid.utils.jById (fluid.moduleLayout.containerId (layout));
        var items = fluid.moduleLayout.createFindItems (layout, perms, grabHandle);    
        var layoutHandler = new fluid.ModuleLayoutHandler (layout, perms, lhOptions);

        return new fluid.Reorderer (reordererRoot, items, layoutHandler, rOptions);
    };
    

    /**
     * Creates a layout customizer from a combination of a layout and permissions object.
     * @param {Object} layout a layout object. See http://wiki.fluidproject.org/x/FYsk for more details
     * @param {Object} perms a permissions data structure. See the above documentation
     */
    fluid.initLayoutCustomizer = function (layout, perms, grabHandle, orderChangedCallbackUrl, options) {        
        return createLayoutCustomizer (layout, perms, grabHandle, orderChangedCallbackUrl, options);
    };

    /**
     * Simple way to create a layout customizer.
     * @param {selector} a selector for the layout container
     * @param {Object} a map of selectors for columns and portlets within the layout
     * @param {Object} additional configuration options
     */
    fluid.reorderLayout = function(containerSelector, layoutSelectors, options) {
        options = options || {};
        
        var container = jQuery(containerSelector);
        var columns = jQuery(layoutSelectors.columns, container);
        var portlets = jQuery(layoutSelectors.portlets, container);
        
        var layout = fluid.moduleLayout.buildLayout(container, columns, portlets);
        var perms = fluid.moduleLayout.buildEmptyPerms(columns, portlets);
        
        return fluid.initLayoutCustomizer(layout, perms, null, options.callbackUrl, options.warningId);
    };    
}) (fluid);
