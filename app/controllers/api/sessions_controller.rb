class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      login!(@user)
      render "api/users/show"
    else
      render json: { base: ['invalid credentials'] }, status: 422
    end
  end

  def destroy
    @user = current_user

    if @user
      logout!
      render "api/users/show"
    else
      render json: {}, status: 404
    end
  end
end
