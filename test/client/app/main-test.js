// describe('main tests', function() {
//   var handler;
  
//   document.addEventListener = function(event, eventHandler) {
//     if(event === 'DOMContentLoaded')
//       handler = eventHandler;
//   };
  
//   it('main registers TasksComponent with bootstrap', function(done) {
//     ng.platform.browser.bootstrap = function(component) {
//       expect(component).to.be.eql(app.TasksComponent);
//       done();
//     };
  
//     handler();
//   });
// });
