module addr::module_name {
    // 点赞数据结构
    struct Like {
        url: string,
        user: address,
    }

    // 文档数据结构
    struct Document {
        likeCount: u64,
        commentCount: u64,
        url: string,
        author: address,
        content: vector<u8>,
    }

    // 评论
    struct Comment {
        url: string,
        user: address,
        ref: vector<u8>,
        comment: vector<u8>,
    }
}



// 存储点赞信息
// 存储结构: 一个地址对应一个点赞列表
// 其中点赞列表包括所有点赞的 url
// 存储方式可以是 [[address], [string]]
// 或者是 { address: [string] }
// 下面示例采用后者。
resource Likes {
    likes: vector<string>,
}

// 存储文档信息
// 存储结构: 文档 url 对应一个 Document
// 存储方式可以是 { string: Document }
// 下面示例采用后者。
resource Documents {
    documents: vector<Document>,
}

// 存储评论信息
// 存储结构: 评论 url 对应 Comment
// 存储方式可以是 { string: Comment }
// 下面示例采用后者。
resource Comments {
    comments: vector<Comment>,
}

// 创建文档
public fun create_document(url: string, author: address, content: vector<u8>) {
    let document = Document {
        likeCount: 0,
        commentCount: 0,
        url,
        author,
        content,
    };
    // 存储文档信息
    let mut documents = move(Documents::load_resource());
    documents.documents.push(document);
}

// 点赞
public fun like_document(url: string, user: address) {
    // 存储点赞信息
    let mut likes = move(Likes::load_resource(user));
    likes.likes.push(url);
    
    // 更新文档信息
    let mut documents = move(Documents::load_resource());
    for i in 0..documents.documents.len() {
        if documents.documents[i].url == url {
            documents.documents[i].likeCount += 1;
            break;
        }
    }
}

// 评论
public fun comment_document(url: string, user: address, ref: vector<u8>, comment: vector<u8>) {
    // 存储评论信息
    let comment = Comment { url, user, ref, comment };
    let mut comments = move(Comments::load_resource());
    comments.comments.push(comment);
    
    // 更新文档信息
    let mut documents = move(Documents::load_resource());
    for i in 0..documents.documents.len() {
        if documents.documents[i].url == url {
            documents.documents[i].commentCount += 1;
            break;
        }
    }
}
