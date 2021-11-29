class BooksController < ApplicationController
  before_action :set_book, only: %i[show edit update destroy]
  before_action :require_user_logged_in, only: %i[index new edit create update destroy]

  # GET /books or /books.json
  def index
    @books = Book.where(user_id: Current.user.id).order(created_at: :desc)
  end

  # GET /books/1 or /books/1.json
  def show
  end

  # GET /books/new
  def new
    @book = Book.new
  end

  # GET /books/1/edit
  def edit
    redirect_to root_path if Current.user.id != @book.user_id
  end

  # POST /books or /books.json
  def create
    @book = Current.user.books.create(book_params)

    if @book.save
      ActionCable.server.broadcast 'room_channel', { book: @book }
      redirect_to books_path, notice: 'Livro cadastrado com sucesso.'
    else
      flash[:alert] = "Erro ao cadastrar livro."
      render :new
    end
  end

  # PATCH/PUT /books/1 or /books/1.json
  def update
    return unless Current.user.id == @book.user_id

    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, notice: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1 or /books/1.json
  def destroy
    return unless Current.user.id == @book.user_id

    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url, notice: 'Book was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_book
    @book = Book.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def book_params
    params.require(:book).permit(:title, :author, :publication_year)
  end
end
