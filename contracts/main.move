// 存储点赞信息
// 存储结构: 一个地址对应一个点赞列表
// 存储方式可以是 [[address], [string]]
// 或者是 { address: [string] }
// 下面示例采用后者。
module Likes {
    resource Likes {
        likes: array<string>,
    }
    
    // 点赞
    public fun like_document(url: string, user: address) {
        // 存储点赞信息
        let mut likes = move(Self::Likes::load_resource(user));
        likes.likes.push(url);
        
        // 更新文档信息
        let mut documents = move(Documents::load_resource());
        for i in 0..documents.len() {
            if documents[i].url == url {
                documents[i].likeCount += 1;
                break;
            }
        }
        move(Documents::update_resource(&documents));
    }
}

// 存储文档信息
// 存储结构: 文档 url 对应一个 Document
// 存储方式可以是 { string: Document }
// 下面示例采用后者。
module Documents {
    resource Documents {
        documents: array<Document>,
    }
    
    // 创建文档
    public fun create_document(url: string, author: address, content: vector<u8>) {
        let mut documents = move(Self::Documents::load_resource());
        let document = Document {
            likeCount: 0,
            commentCount: 0,
            url,
            author,
            content,
        };
        documents.documents.push(document);
        move(Self::Documents::update_resource(&documents));
    }
    
    // 点赞
    public fun like_document(url: string, user: address) {
        Likes::like_document(url, user);
    }
    
    // 评论
    public fun comment_document(url: string, user: address, ref: vector<u8>, comment: vector<u8>) {
        // 存储评论信息
        let comment = Comment { url, user, ref, comment };
        let mut comments = move(Comments::load_resource());
        comments.comments.push(comment);
        
        // 更新文档信息
        let mut documents = move(Self::Documents::load_resource());
        for i in 0..documents.len() {
            if documents[i].url == url {
                documents[i].commentCount += 1;
                break;
            }
        }
        move(Self::Documents::update_resource(&documents));
    }
}

// 存储评论信息
// 存储结构: 评论 url 对应 Comment
// 存储方式可以是 { string: Comment }
// 下面示例采用后者。
module Comments {
    resource Comments {
        comments: array<Comment>,
    }
    
    // 评论
    public fun comment_document(url: string, user: address, ref: vector<u8>, comment: vector<u8>) {
        Documents::comment_document(url, user, ref, comment);
    }
}
