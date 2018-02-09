/*
 * File: app/view/UsersViewController.js
 *
 * This file was generated by Sencha Architect version 4.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.2.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.2.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('SECURITY.view.UsersViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',

    showView: function(view) {
        var layout = this.getReferences().display.getLayout();
        layout.setActiveItem(this.lookupReference(view));
    },

    editUser: function() {
        this.showEditForm();
    },

    showEditForm: function(record) {
         var me = this;

                if (!Ext.isEmpty(record)){
                	me.getViewModel().set('record', record);
                }

                // Set title
                //DDB formPanel.setTitle(panelTitle);

                // Show form
                me.showView('formMain');
    },

    addUser: function() {
         var formPanel = this.getReferences().formFields,
                    form = formPanel.getForm(),
                    newRecord = Ext.create('model.user');

                newRecord.data.id = 0;
                newRecord.data.active = true;


                this.showEditForm(newRecord);
    },

    select: function(rowmodel, record, index, eOpts) {
        this.getViewModel().set('record', record);

        this.getReferences().btnDelete.setDisabled(record === null);

        if(record !== null) {
            this.editUser();
        }
    },

    onSalesDeptBeforeSelect: function(combo, record, index, eOpts) {
        if(combo.getValue().length >1){
            Ext.Msg.alert('Only one can be selected', 'You can only have one Sales Department');
            return false;
        }
    },

    save: function(button, e, eOpts) {
        var me = this,
            form = this.getReferences().formFields.getForm(),
            record = me.getViewModel().get('record'),
            store = this.getStore('users'),
            list = this.lookupReference('list');

        // Valid
        if (form.isValid()) {
            var salesDept = [],
                roles=[];
            if (!Ext.isEmpty(record.data.salesDepartment)){
                Ext.Array.each(record.data.salesDepartment,function(r){
                    salesDept.push({id:r});
                });
                record.data.salesDepartment = salesDept;
            }
            if (!Ext.isEmpty(record.data.roles)){
                Ext.Array.each(record.data.roles,function(r){
                    roles.push({id:r});
                });
                record.data.roles = roles;
            }

            Ext.Ajax.request({
                url: '/DIAM_SECURITY/api/admin/user/save',
                method: 'POST',
                //  jsonData: Ext.encode(record.data),
                params: {

                    user: Ext.encode(record.data)
                },



                success: function(response, opts) {



                    var resultData = Ext.decode(response.responseText);
                    if(resultData.success) {
                        Ext.Msg.alert('Status', 'User saved successfully.', this.showResult, this);
                        store.load();
                        list.getSelectionModel().deselectAll();
                        me.getViewModel().set('record', null);
                        // Hide display
                        me.showView('selectMessage');
                        Ext.log({msg:resultData});
                    }
                    else {
                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: 'Error saving: ' + resultData.message,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR,

                        });
                        Ext.log({msg:resultData});
                    }
                },
                failure: function(response, opts) {
                    console.log('server-side failure with status code ' + response.status);
                }
            });


        }
    },

    cancelEdit: function(button, e, eOpts) {
        // Show details
        this.showView('details');
    },

    add: function(button, e, eOpts) {
        this.addUser();
    },

    edit: function(button, e, eOpts) {
        var formPanel = this.getReferences().form,
            form = formPanel.getForm(),
            record = this.getViewModel().get('record');

        // Load record model into form
        form.loadRecord(record);

        // Set title
        formPanel.setTitle('Edit User');

        // Show form
        this.showView('form');
    },

    remove: function(button, e, eOpts) {
        var me = this;
        var me = this;

        // Ask user to confirm this action
        Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete this user?', function(result) {

            // User confirmed yes
            if (result === 'yes') {

                var record = me.getViewModel().get('record'),
                    store = me.getStore('users');


                Ext.Ajax.request({
                    url: '/DIAM_SECURITY/api/admin/user/delete/' + record.data.id,
                    method: 'POST',
                    success: function(response, opts) {

                        var resultData = Ext.decode(response.responseText);

                        if(resultData.success) {
                            Ext.Msg.alert('Status', 'User deleted successfully.', this.showResult, this);

                            store.removeAll();
                            store.load();
                        } else {
                            Ext.MessageBox.show({
                                title: 'Error deleting',
                                msg: 'Most likely this user cannot be deleted as their username was used in adjustment records. '
                                + 'Set them as inactive instead of deleting them, or contact IT support for help.<br/><br/>',

                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }

                    },
                    failure: function(response, opts) {

                        console.log('server-side failure with status code ' + response.status);
                    }
                });

                // Delete record from store
                //store.remove(record);

                // Hide display
                me.showView('selectMessage');

            }

        });
    }

});