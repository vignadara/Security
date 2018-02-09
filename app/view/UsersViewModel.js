/*
 * File: app/view/UsersViewModel.js
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

Ext.define('SECURITY.view.UsersViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.users',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    stores: {
        users: {
            autoLoad: true,
            model: 'SECURITY.model.User',
            proxy: {
                type: 'ajax',
                extraParams: {
                    applicationCode: 'CAMS'
                },
                url: '/DIAM_SECURITY/api/admin/users',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        SalesDepartmentStore: {
            autoLoad: true,
            model: 'SECURITY.model.SalesDepartment',
            proxy: {
                type: 'ajax',
                extraParams: {
                    applicationCode: 'CAMS'
                },
                url: '/DIAM_SECURITY/api/admin/sales_departments',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        GenericRoles: {
            autoLoad: true,
            model: 'SECURITY.model.Role',
            proxy: {
                type: 'ajax',
                extraParams: {
                    applicationCode: 'CAMS'
                },
                url: '/DIAM_SECURITY/api/admin/roles/GENERIC',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        },
        NotificationFrequencyStore: {
            autoLoad: true,
            model: 'SECURITY.model.NotificationFrequency',
            proxy: {
                type: 'ajax',
                url: '/DIAM_SECURITY/api/admin/notification_frequencies',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }

});