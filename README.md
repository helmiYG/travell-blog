# travell-blog

### list of user routes
Routes | Methods | Description
-------|---------|------------
_/users/register_ | POST | Register new user
_/users/login_ | POST | Login user 


### list of article routes
Routes | Methods | Description
-------|---------|------------
_/articles_ | POST | insert new article
_/articles_ | GET | get all article
_/articles/:id/detailarticle_ | GET | get selected article by id
_/articles/userarticles_ | GET | get all user (user login) article
_/articles/:id_ | PUT | update selected article
_/articles/:id/comment_ | PUT | add a comment to an article
_/articles/:id/comment/:idcomment/delete_ | DELETE | delete selected comment from article
_/articles/:id_ | DELETE | delete selected article

## Usage

```
npm install
npm run dev


