// // import AnimatedLink from './AnimatedLink';
// // import { BasicPages } from '../../both/basicPages';
// // import globalSubs from '../../both/subscriptions';
// //
// Cgv = () => {
//   const cgvContent = BasicPages.findOne({slug: 'cgv'});
//   // @TODO Design a Loading template
//   if (!cgvContent || !cgvContent.content) {
//     return <div>Chargement en cours...</div>;
//   }
//   const htmlContent = marked(cgvContent.content);
//   return (
//     <div className='animated fadeInUp'>
//       <div dangerouslySetInnerHTML={{__html: htmlContent }} />
//       <AnimatedLink to='/'>Retour</AnimatedLink>
//     </div>
//   );
// };
