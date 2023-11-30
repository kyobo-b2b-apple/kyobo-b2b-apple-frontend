import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './layout/Layout';
import MyPageLayout from './layout/MyPageLayout';

import Join from './pages/Join';
import Login from './pages/loginPage/Login';
import InquiryPage from './pages/CompanyInquiryPage';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';
import SolutionPage from './pages/SolutionPage';
import BannerPage from './pages/BannerPage';
import RewardPage from './pages/RewardPage';
import EventPage from './pages/EventPage';
import InfoHandlingPage from './pages/TermsPage/infoHandlingPage';
import PrivacyPolicyPage from './pages/TermsPage/privacyPolicyPage';
import TermsPage from './pages/TermsPage/termsPage';
import ThirdPartyContentPage from './pages/TermsPage/thirdPartyContentPage';
import ProductDetailPage from './pages/productDetailPage/ProductDetailPage';
import SearchPage from './pages/SearchPage';
import PaymentPage from './pages/PaymentPage';
import PayResult from './pages/PayResult';
import PayResultSuccess from './pages/PayResult/success';
import PayResultFail from './pages/PayResult/fail';

import MyPageUserChangePage from './pages/MyPageWithSidebar/MyPageUserChangePage';
import CartPage from './pages/Cart';
import DeliveryTracking from './pages/MyPageWithSidebar/DeliveryTracking';
import DeliverPlaceList from './pages/MyPageWithSidebar/DeliverPlaceList';
import CouponPage from './pages/MyPageWithSidebar/Coupon';
import OrderList from './pages/MyPageWithSidebar/OrderList';
import OrderDetail from './pages/MyPageWithSidebar/OrderDetail';
import RefundHistory from './pages/MyPageWithSidebar/RefundHistory';
import WishList from './pages/MyPageWithSidebar/WishList';
import ProductInquiry from './pages/MyPageWithSidebar/ProductInquiry';
import ProductReview from './pages/MyPageWithSidebar/ProductReview';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/terms/info" element={<InfoHandlingPage />} />
            <Route path="/terms/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms/index" element={<TermsPage />} />
            <Route path="/terms/content" element={<ThirdPartyContentPage />} />
            <Route path="/inquiry" element={<InquiryPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/reward" element={<RewardPage />} />
            <Route path="/pay" element={<PaymentPage />} />
            <Route path="/pay-result" element={<PayResult />} />
            <Route path="/pay-result-success" element={<PayResultSuccess />} />
            <Route path="/pay-result-fail" element={<PayResultFail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/solutions" element={<SolutionPage />} />
            <Route path="/banner/:eventId" element={<BannerPage />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/my-page" element={<MyPageLayout />}>
              <Route path="userchange" element={<MyPageUserChangePage />} />
              <Route path="/my-page/order-list" element={<OrderList />} />

              <Route path="/my-page/delivery-tracking/:orderCode" index element={<DeliveryTracking />} />

              <Route path="/my-page/delivery-placelist" index element={<DeliverPlaceList />} />
              <Route path="/my-page/order-detail/:orderId" element={<OrderDetail />} />
              <Route path="/my-page/refund-history" element={<RefundHistory />} />
              <Route path="/my-page/wish-list" element={<WishList />} />
              <Route path="/my-page/product-inquiry" element={<ProductInquiry />} />
              <Route path="/my-page/product-review" element={<ProductReview />} />
              <Route path="/my-page/coupon" element={<CouponPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
