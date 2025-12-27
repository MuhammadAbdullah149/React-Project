import { Client, ID ,  TablesDB , Storage , Query } from "appwrite";
import conf from "../conf/conf";
import { Permission, Role } from "appwrite";

export class Services {
  client = new Client();
  databases;
  table;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);
    this.table = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImg, userId, status }) {
    try {
      return await this.table.createRow({
        databaseId: conf.appwriteDataBaseId,
        tableId: conf.appwriteCollectionId,
        rowId: slug,
        data: { title, content, featuredImg, userId, status }
      }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.table.updateRow({
        databaseId : conf.appwriteDataBaseId,
        tableId : conf.appwriteCollectionId,
        rowId : slug,
        data: {
          title,
          content,
          featuredImage,
          status
        }
      });
    } catch (error) {
      throw error;
    }
  }

  async getPost(rowId) {
    try {
      return await this.table.getRow({
        databaseId : conf.appwriteDataBaseId,
        tableId : conf.appwriteCollectionId,
        rowId : rowId
      });
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      throw error;
    }
  }

  async getAllPosts( queries = [Query.equal("status", "active")] ) {
    try {
      return await this.table.listRows({
        databaseId : conf.appwriteDataBaseId,
        tableId : conf.appwriteCollectionId,
        queries 
      });
    } catch (error) {
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.table.deleteRow({
        databaseId : conf.appwriteDataBaseId,
        tableId :conf.appwriteCollectionId,
        rowId : slug
      });
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())]
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
    } catch (error) {
      throw error;
    }
  }

  getFilePreview(fileId) {
    try {
      return `${conf.appwriteURL}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
    } catch (error) {
      throw error;
    } 
  }          
  // getFilePreview(fileId) {
  //   try {
  //     return this.bucket.getFilePreview(
  //       conf.appwriteBucketId,
  //       fileId,
  //     );
  //   } catch (error) {
  //     throw error;
  //   } 
  // }          
}

const AppwriteServices = new Services();

export default AppwriteServices;

