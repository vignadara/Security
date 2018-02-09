/*
 * File: app/model/SalesDepartment.js
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

Ext.define('SECURITY.model.SalesDepartment', {
    extend: 'Ext.data.Model',
    alias: 'model.salesdepartment',

    requires: [
        'Ext.data.field.String',
        'Ext.data.field.Integer'
    ],

    fields: [
        {
            type: 'string',
            name: 'code'
        },
        {
            type: 'string',
            name: 'departmentHead'
        },
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'name'
        }
    ]
});