{
    let createPost = function()
    {
        
    let newPostForm= $('#new-post-form');
    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type: 'post',
            url: '/post/create',
            data: newPostForm.serialize(),
            success: function(data){
                
                let newPost = newPostDom(data.data.post);
                $('#post-display-container>ul').prepend(newPost);
                deletePost($(' .delete-post-button',newPost))
                new PostComments(data.data.post._id);

                // CHANGE :: enable the functionality of the toggle like button on the new post
                new ToggleLike($(' .toggle-like-button', newPost));
            }, error: function(error){
                console.log(error.responseText);
            }
        });
    });

    
       }
    
    //Method to creata a Post in Dom
    let newPostDom =  function (post)
    {
        return $(`<li id="post-${post._id}">
        <p>
               
                <small><a class="delete-post-button" href="/post/destroy/${post._id}">X</a></small>
                
                ${post.content}
                        <br>
                        <small>
                        ${post.user.name}
                        </small>
                        <br>
                        <small>
                            
                        <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                            0 Likes
                        </a>
                    
                </small>
                        <!-- <h1> <%=post.comments%></h1> -->
                </p>
                <div class="post-comments">
                    
                                <form action="/comments/create" method="POST">
        <input type="text" name="content" placeholder="Type here to Comment...." required>

        <input type="hidden" name="post" value=" ${post._id}">
        <input type="submit" value="Add Comment">
                                </form>
    
                                
        <div class="post-comments-list">
                <ul id="post-comments-<%= i._id%>">
                
                
                </ul>
        </div>
    </div>
    
        </li>`)
      }

// Method to delete the Post
      let deletePost= function(deleteLink)
      {
          console.log("IN DELELELELE function");
          
          $(deleteLink).click(function(e)
          {
              e.preventDefault();
              $.ajax({
                  type: "get",
                  url: $(deleteLink).prop('href'),
                  success: function (data) {
                      console.log("*******************");
                     console.log(data.data.post_id);
                     console.log($(`#post-${data.data.post_id}`));
                    //  $('#post-display-container>ul')
                //    $(`post-${data.data.post_id}`).remove();
                   $(`#post-${data.data.post_id}`).remove();
                  },error: function(error)
                  {
                      console.log(error.responseText);
                  }
              });
          });
      }

      createPost();
}