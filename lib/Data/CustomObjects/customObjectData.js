'use strict';
/**
 * @module
 */

/** CustomObjectData Class */
export default class CustomObjectData {
  /**
   * Parent Object
   * @member {Eloqua}
   */
  #parent;

  /**
   * Constructor
   * @param {Eloqua} options Parent object
   */
  constructor(options) {
    this.#parent = options;
  }

  /**
   * Retrieve Custom Object Data
   * @param {number} parentId
   * @param {querystring} [querystring] querystring params to include in request
   * @param {Eloqua.callback} cb Callback to be returned
   * @returns {Object|String} Eloqua response object or error string
   */
  get(parentId, querystring, cb) {
    let qs = {};
    if (querystring) {
      qs = this.#parent._validate(['count', 'depth', 'lastUpdatedAt', 'orderBy', 'page', 'search'], querystring);
    }

    return this.#parent._request({
      api: 'REST',
      uri: `/data/customObject/${parentId}/instances`,
      qs: qs,
    }, cb);
  }

  /**
   * Retrieve Single Custom Object Data Record
   * @param {number} parentId
   * @param {number} id ID of segment
   * @param {Object} [querystring] querystring params to include in request
   * @param {string} [querystring.depth] Level of detail to return (minimal, partial, complete)
   * @param {Eloqua.callback} cb Callback to be returned
   * @returns {Object|String} Eloqua response object or error string
   */
  getOne(parentId, id, querystring, cb) {
    let qs = {};
    if (querystring) {
      qs = this.#parent._validate(['depth'], querystring);
    }

    return this.#parent._request({
      api: 'REST',
      uri: `/data/customObject/${parentId}/instance/${id}`,
      qs: qs,
    }, cb);
  }

  /**
   * Create Custom Object Data Record
   * @param {number} parentId
   * @param {customObjectData} customObjectData
   * @param {Eloqua.callback} cb Callback to be returned
   * @returns {Object|String} Eloqua response object or error string
   */
  create(parentId, customObjectData, cb) {
    const data = this.#parent._validate(
      [
        'accessedAt',
        'accountId',
        'contactId',
        'createdAt',
        'createdBy',
        'currentStatus',
        'customObjectRecordStatus',
        'depth',
        'description',
        'fieldValues',
        'folderId',
        'id',
        'name',
        'permissions',
        'scheduledFor',
        'sourceTemplateId',
        'type',
        'uniqueCode',
        'updatedAt',
        'updatedBy',
      ],
      customObjectData,
    );

    return this.#parent._request({
      api: 'REST',
      uri: `/data/customObject/${parentId}/instance`,
      method: 'post',
      data: data,
    }, cb);
  }

  /**
   * Update Custom Object Data Record
   * @param {number} parentId
   * @param {number} id ID of segment
   * @param {customObjectData} customObjectData
   * @param {Eloqua.callback} cb Callback to be returned
   * @returns {Object|String} Eloqua response object or error string
   */
  update(parentId, id, customObjectData, cb) {
    const data = this.#parent._validate(
      [
        'accessedAt',
        'accountId',
        'contactId',
        'createdAt',
        'createdBy',
        'currentStatus',
        'customObjectRecordStatus',
        'depth',
        'description',
        'fieldValues',
        'folderId',
        'id',
        'name',
        'permissions',
        'scheduledFor',
        'sourceTemplateId',
        'type',
        'uniqueCode',
        'updatedAt',
        'updatedBy',
      ],
      customObjectData,
    );

    return this.#parent._request({
      api: 'REST',
      uri: `/data/customObject/${parentId}/instance/${id}`,
      method: 'put',
      data: data,
    }, cb);
  }

  /**
   * Delete Custom Object Data Record
   * @param {number} parentId
   * @param {number} id ID of segment
   * @param {Eloqua.callback} cb Callback to be returned
   * @returns {Object|String} Eloqua response object or error string
   */
  delete(parentId, id, cb) {
    return this.#parent._request({
      api: 'REST',
      uri: `/data/customObject/${parentId}/instance/${id}`,
      method: 'delete',
    }, cb);
  }
}

