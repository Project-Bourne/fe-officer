import { request } from "../hooks/api";

class AnalyzerService {
  /**
   * Create a new Analysis.
   * @param {Object} data - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

  static async analyze(data) {
    try {
      const response = await request(
        `analysis/`,
        "POST",
        data,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }



    /**
   * Create a new Analysis.
   * @param {Object} data - The data of the new workspace.
   * @returns {Promise<Object>} - The response data from the server.
   */

    static async analyzeFile(data) {
      try {
        const response = await request(
          `analysis/file`,
          "POST",
          data,
          true,
          false,
          false,
        );
        return response;
      } catch (error) {
        throw error;
      }
    }
  

  /**
   * Delete a translation by its ID.
   * @param {string} id - The ID of the translation to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

  static async deleteAnalysis(id) {
    try {
      await request(
        `delete/analysis/history/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
    } catch (error) {
      throw error;
    }
  }


   /**
   * Delete a translation by its ID.
   * @param {string} id - The ID of the translation to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

   static async bookMarkAnalysis(id) {
    try {
      await request(
        `bookmark/analysis/${id}`,
        "PUT",
        {},
        true,
        false,
        false,
      );
    } catch (error) {
      throw error;
    }
  }
  

  /**
   * Update a workspace by its ID.
   * @param {string} Id - The ID of the workspace to update.
   * @returns {Promise<Object>} - The response data from the server.
   */


  static async getAnalysisById(Id) {
    try {
      const response = await request(
        `analysis/${Id}`,
        "GET",
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }


  /**
   * Get a workspace by its ID.
   * @param {string} - The ID of the workspace to get.
   * @returns {Promise<Object>} - The response data from the server.
   */

  static async getAnalyzerHistory() {
    try {
      const response = await request(
        `analysis/user`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Export the Service class.
export default AnalyzerService;
